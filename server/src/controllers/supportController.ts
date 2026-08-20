import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { SupportTicket } from '../models/SupportTicket';
import { AuthenticatedRequest } from '../middleware/authJwt';
import { SupportTicketStatus, SupportTicketPriority } from '../constants';
import { inMemoryStore } from '../config/memoryStore';

export const createTicket = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    const { subject, category, priority, message } = req.body;

    if (!subject || !category || !message) {
      res.status(400).json({ success: false, message: 'Subject, category, and message are required' });
      return;
    }

    const ticketId = `TCK-TRI-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const ticket = {
      _id: `tck_${Date.now()}`,
      ticketId,
      userId: req.user._id,
      userName: req.user.name,
      userEmail: req.user.email,
      subject,
      category,
      priority: priority || SupportTicketPriority.MEDIUM,
      status: SupportTicketStatus.OPEN,
      messages: [
        {
          senderId: req.user._id,
          senderName: req.user.name,
          senderRole: req.user.role,
          message,
          createdAt: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    inMemoryStore.tickets.unshift(ticket);

    res.status(201).json({
      success: true,
      message: 'Support ticket created successfully',
      ticket,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyTickets = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    const tickets = inMemoryStore.tickets.filter((t) => t.userId === req.user._id);
    res.status(200).json({ success: true, tickets });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addMessageToTicket = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    const { ticketId } = req.params;
    const { message } = req.body;

    if (!message) {
      res.status(400).json({ success: false, message: 'Message content is required' });
      return;
    }

    const ticket = inMemoryStore.tickets.find((t) => t.ticketId === ticketId);
    if (!ticket) {
      res.status(404).json({ success: false, message: 'Ticket not found' });
      return;
    }

    ticket.messages.push({
      senderId: req.user._id,
      senderName: req.user.name,
      senderRole: req.user.role,
      message,
      createdAt: new Date().toISOString(),
    });

    ticket.updatedAt = new Date().toISOString();

    res.status(200).json({
      success: true,
      message: 'Message added to ticket',
      ticket,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Public Contact Form Endpoint
export const submitContactMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ success: false, message: 'Name, email, and message are required' });
      return;
    }

    const newContact = {
      _id: `msg_${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject ? subject.trim() : 'Website General Inquiry',
      message: message.trim(),
      status: 'UNREAD',
      createdAt: new Date().toISOString(),
    };

    inMemoryStore.contactMessages.unshift(newContact);

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been received by Tridrishti Helpdesk. A support representative will respond shortly.',
      contact: newContact,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin List Contact Messages
export const getContactMessages = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      messages: inMemoryStore.contactMessages,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin Mark Contact Message Status
export const updateContactMessageStatus = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const msg = inMemoryStore.contactMessages.find((m) => m._id === id);
    if (msg) {
      msg.status = status;
    }

    res.status(200).json({
      success: true,
      message: 'Status updated',
      messageItem: msg,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
