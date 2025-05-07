
export type NotificationType = 
  | 'vendor_application'
  | 'order_update'
  | 'payment_issue'
  | 'system_alert'
  | 'service_update';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string | Date;
  link?: string; // Optional link to redirect when clicking the notification
  metadata?: Record<string, any>; // Optional additional data
}
