
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '@/config/firebase';
import { NotificationType } from '@/types/NotificationTypes';

const db = getFirestore(app);

export const createNotification = async (
  type: NotificationType,
  title: string,
  message: string,
  link?: string,
  metadata?: Record<string, any>
) => {
  try {
    await addDoc(collection(db, "adminNotifications"), {
      type,
      title,
      message,
      read: false,
      createdAt: serverTimestamp(),
      link,
      metadata
    });
    return true;
  } catch (error) {
    console.error("Error creating notification:", error);
    return false;
  }
};

export const generateMockNotifications = async () => {
  const mockNotifications = [
    {
      type: 'vendor_application' as NotificationType,
      title: 'New Vendor Application',
      message: 'Fresh Grocery Market has submitted a new application for review.',
      link: '/admin/vendors'
    },
    {
      type: 'order_update' as NotificationType,
      title: 'Order #1234 Pending',
      message: 'A new order requires your attention.',
      link: '/admin/orders'
    },
    {
      type: 'payment_issue' as NotificationType,
      title: 'Payment Failed',
      message: 'Customer payment for order #5678 has failed.',
      link: '/admin/orders'
    },
    {
      type: 'system_alert' as NotificationType,
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur tonight at 2:00 AM.',
    },
    {
      type: 'vendor_application' as NotificationType,
      title: 'Vendor Documents Updated',
      message: 'Artisan Bakery has uploaded new verification documents.',
      link: '/admin/vendors'
    }
  ];

  for (const notification of mockNotifications) {
    await createNotification(
      notification.type,
      notification.title,
      notification.message,
      notification.link
    );
  }
};
