import 'dotenv/config';           // ← FIXED: dotenv must load first
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/error.middleware.js';

import userRoutes from './routes/user.routes.js';
import courseRoutes from './routes/course.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import miscRoutes from './routes/miscellaneous.routes.js';

const app = express();

// Built-in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS — FIXED
app.options('*', cors());         
app.use(
  cors({
    origin: [
      'https://edu-stream-cyan.vercel.app',  
      process.env.FRONTEND_URL,             
    ],
    credentials: true,
  })
);

app.use(morgan('dev'));
app.use(cookieParser());

// Health check
app.get('/ping', (_req, res) => {
  res.send('Pong');
});

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1', miscRoutes);

// 404
app.all('*', (_req, res) => {
  res.status(404).send('OOPS!!! 404 Page Not Found');
});

// Error middleware
app.use(errorMiddleware);

export default app;
