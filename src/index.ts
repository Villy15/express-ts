import cors from 'cors';
import express from 'express';
import { Request, Response } from 'express-serve-static-core';
import session from 'express-session';
import path from 'path';

import helmet from 'helmet';
import errorHandler from './middlewares/error.middleware';
import logger from './middlewares/logger.middleware';
import notFound from './middlewares/not-found.middlware';

// Import routes
import users from './routes/users.route';

const app = express();

const port = process.env.PORT || 5000;

// Middlewares
app.use(
  cors({
    // Allow only the frontend to access the backend
    origin: [
      'http://localhost:3000',
      'https://itsecwb-aawj.xyz',
      'http://localhost:4173',
    ],
    credentials: true,
  })
);
app.use(express.json()); // Able to send JSON data
app.use(express.urlencoded({ extended: true })); // Able to send form data
app.use(logger);

// Security
app.use(
  helmet({
    // To fix The resource at “http://localhost:8000/assets/AFAC%20(square).png” was blocked due to its Cross-Origin-Resource-Policy header (or lack thereof). See https://developer.mozilla.org/docs/Web/HTTP/Cross-Origin_Resource_Policy_(CORP)#
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// Session
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    proxy: true, // Required for Heroku & Digital Ocean (regarding X-Forwarded-For)
    name: 'itsecwb-session', // This will be unique per-host.
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' for production, 'lax' for other environments
      httpOnly: false,
    },
  })
);

// Static folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.send({
    message: 'Server is running',
  });
});

// Routes
app.use('/api/users', users);

// Catch all error
app.use(notFound);

// Error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
