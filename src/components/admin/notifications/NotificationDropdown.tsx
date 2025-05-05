import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Check, AlertCircle, Package, User, Clock, ShoppingCart } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNotifications } from '@/context/NotificationContext';
import { NotificationType } from '@/types/NotificationTypes';
import { ScrollArea } from "@/components/ui/scroll-area";

const NotificationDropdown = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, loading } = useNotifications();
  const navigate = useNavigate();

  const getNotificationIcon = (type: NotificationType) => {
    switch(type) {
      case 'vendor_application':
        return <User className="h-4 w-4 text-blue-500" />;
      case 'order_update':
        return <Package className="h-4 w-4 text-green-500" />;
      case 'payment_issue':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'system_alert':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const formatTime = (dateString: string | Date) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    // If less than a day, show relative time
    if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      if (hours === 0) {
        const minutes = Math.floor(diff / (60 * 1000));
        return minutes <= 0 ? 'just now' : `${minutes}m ago`;
      }
      return `${hours}h ago`;
    }

    // Otherwise, show the date
    return date.toLocaleDateString();
  };

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    if (notification.link) {
      navigate(notification.link);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 min-w-[1.1rem] h-[1.1rem] flex items-center justify-center px-[0.3rem] text-[0.6rem]"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-7 px-2"
              onClick={() => markAllAsRead()}
            >
              <Check className="h-3 w-3 mr-1" /> Mark all as read
            </Button>
          )}
        </div>

        <ScrollArea className="h-[calc(80vh-10rem)] max-h-[400px]">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-theme-purple"></div>
            </div>
          ) : notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`px-4 py-3 cursor-pointer ${notification.read ? 'opacity-70' : 'bg-muted/40'}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between">
                      <p className={`text-sm font-medium ${notification.read ? '' : 'font-semibold'}`}>
                        {notification.title}
                      </p>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" /> {formatTime(notification.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {notification.message}
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center px-4">
              <Bell className="h-8 w-8 text-muted-foreground mb-2 opacity-30" />
              <p className="text-sm text-muted-foreground">No notifications yet</p>
            </div>
          )}
        </ScrollArea>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button 
            variant="ghost" 
            className="w-full justify-center text-sm font-medium"
            onClick={() => navigate('/admin/notifications')}
          >
            View all notifications
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
