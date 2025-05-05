
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFirestore, collection, query, orderBy, limit, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { app } from '@/config/firebase';
import { Notification } from '@/types/NotificationTypes';
import { useToast } from '@/components/ui/use-toast';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  loading: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);
  const { toast } = useToast();

  useEffect(() => {
    const notificationsQuery = query(
      collection(db, "adminNotifications"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
      const notificationsList: Notification[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          type: data.type,
          title: data.title,
          message: data.message,
          read: data.read || false,
          createdAt: data.createdAt ? new Date(data.createdAt.toDate()).toISOString() : new Date().toISOString(),
          link: data.link || undefined,
          metadata: data.metadata || undefined
        };
      });
      
      setNotifications(notificationsList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching notifications:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [db]);

  const markAsRead = async (id: string) => {
    try {
      await updateDoc(doc(db, "adminNotifications", id), {
        read: true
      });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast({
        title: "Error",
        description: "Failed to mark notification as read",
        variant: "destructive"
      });
    }
  };

  const markAllAsRead = async () => {
    try {
      const promises = notifications
        .filter(notification => !notification.read)
        .map(notification => 
          updateDoc(doc(db, "adminNotifications", notification.id), { read: true })
        );
      
      await Promise.all(promises);
      
      toast({
        title: "Success",
        description: "All notifications marked as read",
      });
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      toast({
        title: "Error",
        description: "Failed to mark all notifications as read",
        variant: "destructive"
      });
    }
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      unreadCount, 
      markAsRead, 
      markAllAsRead,
      loading 
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
