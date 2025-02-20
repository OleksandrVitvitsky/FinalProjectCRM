import express, { NextFunction, Request, Response } from 'express';
import * as mongoose from 'mongoose';

import { configs } from './configs/configs';
import { ApiError } from './errors/api-error';
import { authRouter } from './routers/auth.router';
import { orderRouter } from './routers/order.router';
import { userRouter } from './routers/user.router';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/orders', orderRouter);
// Handle errors
app.use(
  '*',
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json(err.message);
  },
);

// Handle uncaught exceptions
process.on('uncaughtException', (e) => {
  console.error('uncaughtException', e.message, e.stack);
  process.exit(1);
});

/// Start the server
app.listen(configs.APP_PORT, configs.APP_HOST, async () => {
  try {
    await mongoose.connect(configs.MONGO_URI);
    console.log('MongoDB connected successfully');
    console.log(`Server is running on port ${configs.APP_PORT}`);
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
});
