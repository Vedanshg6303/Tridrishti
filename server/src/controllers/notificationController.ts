import { Response } from 'express';
import { Notification } from '../models/Notification';
import { AuthenticatedRequest } from '../middleware/authJwt';

export const getMyNotifications = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 }).limit(30);
    const unreadCount = await Notification.countDocuments({ userId: req.user._id, read: false });

    res.status(200).json({ success: true, notifications, unreadCount });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markAsRead = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    const { id } = req.params;
    await Notification.findOneAndUpdate({ _id: id, userId: req.user._id }, { read: true });

    res.status(200).json({ success: true, message: 'Notification marked as read' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markAllAsRead = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    await Notification.updateMany({ userId: req.user._id, read: false }, { read: true });
    res.status(200).json({ success: true, message: 'All notifications marked as read' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
