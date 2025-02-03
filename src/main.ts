import express, { NextFunction, Request, Response } from 'express';

import { ApiError } from './errors/api-error';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
