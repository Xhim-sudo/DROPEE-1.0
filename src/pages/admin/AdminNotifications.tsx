
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Check, 
  AlertCircle, 
  Package, 
  User, 
  Clock, 
  ShoppingCart,
  Filter,
  Search
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useNotifications } from '@/context/NotificationContext';
import { Notification, NotificationType } from '@/types/NotificationTypes';

const AdminNotifications = () => {
  const { notifications, markAsRead, markAllAsRead, loading } = useNotifications();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  const { toast } = useToast();

  const getNotificationIcon = (type: NotificationType) => {
    switch(type) {
      case 'vendor_application':
        return <User className="h-5 w-5 text-blue-500" />;
      case 'order_update':
        return <Package className="h-5 w-5 text-green-500" />;
      case 'payment_issue':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'system_alert':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  const filterNotifications = () => {
    let filtered = [...notifications];

    // Apply tab filter
    if (activeTab !== 'all') {
      filtered = filtered.filter(notification => notification.type === activeTab);
    }

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(notification => 
        notification.title.toLowerCase().includes(searchLower) || 
        notification.message.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    if (notification.link) {
      navigate(notification.link);
    }
  };

  const filteredNotifications = filterNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Manage and review system notifications
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            <Check className="mr-2 h-4 w-4" /> Mark All as Read
          </Button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notifications..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="mb-4">
          <TabsTrigger value="all" className="relative">
            All
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">{unreadCount}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="vendor_application">Vendor Applications</TabsTrigger>
          <TabsTrigger value="order_update">Orders</TabsTrigger>
          <TabsTrigger value="payment_issue">Payments</TabsTrigger>
          <TabsTrigger value="system_alert">System Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-theme-purple"></div>
            </div>
          ) : filteredNotifications.length > 0 ? (
            <div className="space-y-4">
              {filteredNotifications.map(notification => (
                <Card 
                  key={notification.id} 
                  className={`cursor-pointer transition-colors hover:bg-muted/50 ${!notification.read ? 'border-l-4 border-l-theme-purple' : ''}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 p-2 rounded-full bg-muted">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className={`font-semibold ${!notification.read ? 'text-theme-purple' : ''}`}>
                            {notification.title}
                            {!notification.read && (
                              <span className="ml-2 inline-block w-2 h-2 bg-theme-purple rounded-full"></span>
                            )}
                          </h3>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" /> {formatDate(notification.createdAt)}
                          </div>
                        </div>
                        <p className="text-muted-foreground mt-1">{notification.message}</p>
                        
                        {notification.link && (
                          <div className="flex justify-end mt-2">
                            <Button variant="ghost" size="sm" className="text-theme-purple">
                              View details
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Bell className="h-16 w-16 text-muted-foreground mb-4 opacity-30" />
              <h3 className="text-lg font-semibold">No notifications found</h3>
              <p className="text-muted-foreground mt-1">
                {searchTerm ? 'Try adjusting your search term' : 'You\'re all caught up!'}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminNotifications;
