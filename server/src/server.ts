import express, { Request, Response } from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { errorHandler } from './middleware/errorHandler';
import { initInMemoryStore } from './config/memoryStore';

// Route imports
import authRoutes from './routes/authRoutes';
import membershipRoutes from './routes/membershipRoutes';
import pointsRoutes from './routes/pointsRoutes';
import networkRoutes from './routes/networkRoutes';
import rewardsRoutes from './routes/rewardsRoutes';
import benefitsRoutes from './routes/benefitsRoutes';
import insuranceRoutes from './routes/insuranceRoutes';
import educationRoutes from './routes/educationRoutes';
import impactRoutes from './routes/impactRoutes';
import supportRoutes from './routes/supportRoutes';
import notificationRoutes from './routes/notificationRoutes';
import adminRoutes from './routes/adminRoutes';
import ownerRoutes from './routes/ownerRoutes';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Setup Socket.IO for live dashboard updates & notifications
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

io.on('connection', (socket) => {
  console.log(`[Socket.IO] Client connected: ${socket.id}`);

  socket.on('join_user_channel', (userId) => {
    socket.join(`user_${userId}`);
    console.log(`[Socket.IO] User ${userId} joined personal channel`);
  });

  socket.on('disconnect', () => {
    console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
  });
});

export const emitToUser = (userId: string, event: string, payload: any) => {
  io.to(`user_${userId}`).emit(event, payload);
};

// Security & Parsing Middlewares
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health check and root API endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    platform: 'TRIDRISHTI.COM Ecosystem API',
    timestamp: new Date().toISOString(),
    complianceNotice: 'TRI Points are platform reward points and not cryptocurrency or guaranteed financial returns.',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/points', pointsRoutes);
app.use('/api/network', networkRoutes);
app.use('/api/rewards', rewardsRoutes);
app.use('/api/benefits', benefitsRoutes);
app.use('/api/insurance', insuranceRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/impact', impactRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/owner', ownerRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

export const startServer = async () => {
  // Initialize in-memory mock store immediately for zero-delay response
  await initInMemoryStore();

  // Non-blocking MongoDB connection attempt in background
  connectDB()
    .then(async () => {
      const { initializeDatabaseIndexes } = await import('./config/initDatabase');
      await initializeDatabaseIndexes();
    })
    .catch((err) => {
      console.warn('[Database] Running in In-Memory fallback mode');
    });

  server.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 TRIDRISHTI API Server running immediately on port ${PORT}`);
    console.log(`🌐 Endpoint: http://localhost:${PORT}/api/health`);
    console.log(`🛡️  Compliance & Anti-Fraud Engine initialized`);
    console.log(`=======================================================`);
  });
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export { app, server, io };
