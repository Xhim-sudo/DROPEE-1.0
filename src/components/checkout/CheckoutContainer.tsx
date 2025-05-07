
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { calculateDeliveryFee } from '@/utils/deliveryUtils';
import { useCart } from '@/context/CartContext';
import CustomerInfoForm from './CustomerInfoForm';
import DeliveryPaymentOptions from './DeliveryPaymentOptions';
import OrderSummary from './OrderSummary';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '@/config/firebase';
import { createNotification } from '@/utils/notificationUtils';

const CheckoutContainer: React.FC = () => {
  const navigate = useNavigate();
  const { items, getSubtotal, clearCart } = useCart();
  const db = getFirestore(app);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    instructions: '',
    deliveryOption: 'delivery',
    paymentMethod: 'cash'
  });

  const [upiId, setUpiId] = useState('vendor@upi'); // Vendor UPI ID would come from vendor data

  // Use default values for delivery factors now managed by admin
  const distance = 3; // default distance in km
  const weight = 1; // default weight in kg
  const weather = 'normal'; // default weather condition
  const [deliveryFees, setDeliveryFees] = useState({
    baseFee: 100,
    distanceFee: 0,
    weightFee: 0,
    weatherFee: 0,
    totalFee: 100
  });

  // Calculate delivery fees using admin-set parameters
  useEffect(() => {
    const fees = calculateDeliveryFee(distance, weight, weather);
    setDeliveryFees(fees);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpiIdChange = (value: string) => {
    setUpiId(value);
  };

  // Function to send WhatsApp message
  const sendWhatsAppMessage = (phone: string, orderId: string, orderDetails: string) => {
    // Format the phone number (remove any non-digit characters)
    const formattedPhone = phone.replace(/\D/g, '');
    
    // Prepare the WhatsApp message
    const message = encodeURIComponent(`New Order #${orderId}:\n\n${orderDetails}`);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${message}`;
    
    // Open WhatsApp in a new window
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields based on delivery option
    if (!formData.name || !formData.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Validate address for delivery option
    if (formData.deliveryOption === 'delivery' && !formData.address) {
      toast({
        title: "Missing address",
        description: "Please provide a delivery address.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Prepare order data
      const subtotal = getSubtotal();
      const deliveryFee = formData.deliveryOption === 'delivery' ? deliveryFees.totalFee : 0;
      const total = subtotal + deliveryFee;
      
      const orderData = {
        customer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email || '',
          address: formData.deliveryOption === 'delivery' ? formData.address : 'Pickup at store'
        },
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          vendorId: item.vendorId,
          vendorName: item.vendorName
        })),
        subtotal,
        deliveryFee,
        total,
        deliveryOption: formData.deliveryOption,
        paymentMethod: formData.paymentMethod,
        instructions: formData.instructions || 'None',
        status: 'Pending',
        paymentStatus: formData.paymentMethod === 'cash' ? 'Pending' : 'Paid',
        createdAt: serverTimestamp()
      };
      
      // Save order to Firestore
      const orderRef = await addDoc(collection(db, "orders"), orderData);
      const orderId = orderRef.id;
      
      // Create notification for admin
      await createNotification(
        'new_order',
        'New Order Received',
        `Order #${orderId} has been placed by ${formData.name}`,
        `/admin/orders`,
        { orderId }
      );
      
      // Group items by vendor
      const vendorOrders: Record<string, any[]> = {};
      items.forEach(item => {
        if (!vendorOrders[item.vendorId]) {
          vendorOrders[item.vendorId] = [];
        }
        vendorOrders[item.vendorId].push(item);
      });
      
      // Send WhatsApp messages to each vendor
      Object.entries(vendorOrders).forEach(([vendorId, vendorItems]) => {
        // In a real app, you would fetch the vendor's phone from the database
        // For now, using a mock phone number
        const vendorPhone = "+919876543210"; // This should be fetched from vendor data
        
        // Create order details for this vendor
        const orderDetails = `
Customer: ${formData.name}
Contact: ${formData.phone}
Address: ${formData.deliveryOption === 'delivery' ? formData.address : 'Pickup at store'}
Items:
${vendorItems.map(item => `- ${item.quantity}x ${item.name} (₹${(item.price * item.quantity).toFixed(2)})`).join('\n')}
Subtotal: ₹${vendorItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
Delivery: ${formData.deliveryOption} - ₹${formData.deliveryOption === 'delivery' ? deliveryFees.totalFee.toFixed(2) : '0.00'}
Payment: ${formData.paymentMethod}
Instructions: ${formData.instructions || 'None'}
`.trim();
        
        // Send WhatsApp message
        sendWhatsAppMessage(vendorPhone, orderId, orderDetails);
      });
      
      toast({
        title: "Order placed successfully!",
        description: "You will receive a WhatsApp message with your order details.",
      });
      
      // Clear the cart and redirect to success page
      clearCart();
      navigate('/order-success');
    } catch (error) {
      console.error("Error processing order:", error);
      toast({
        title: "Order failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Redirect to home if cart is empty
  if (items.length === 0) {
    navigate('/');
    return null;
  }

  // Calculate totals
  const subtotal = getSubtotal();
  const deliveryFee = formData.deliveryOption === 'delivery' ? deliveryFees.totalFee : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Checkout Form */}
      <div className="flex-grow">
        <Card>
          <CardHeader>
            <CardTitle>Delivery Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
              <CustomerInfoForm formData={formData} onChange={handleChange} />
            </form>
          </CardContent>
        </Card>
        
        <DeliveryPaymentOptions 
          deliveryOption={formData.deliveryOption}
          paymentMethod={formData.paymentMethod}
          upiId={upiId}
          onOptionChange={handleSelectChange}
          onUpiIdChange={handleUpiIdChange}
        />
      </div>
      
      {/* Order Summary */}
      <div className="lg:w-80">
        <OrderSummary
          items={items}
          subtotal={subtotal}
          deliveryFees={deliveryFees}
          deliveryOption={formData.deliveryOption}
          total={total}
        />
      </div>
    </div>
  );
};

export default CheckoutContainer;
