import express from 'express';
import path from 'path';

import corsOptions from './app/middlewares/cors.middleware';
import errorHandler from './app/middlewares/error.middleware';
import helmetConfig from './app/middlewares/helmet.middleware';
import logger from './app/middlewares/logger.middleware';
import notFound from './app/middlewares/not-found.middlware';
import sessionConfig from './app/middlewares/session.middleware';

import posts from './app/routes/posts.route';
import users from './app/routes/users.route';

const app = express();

// Middlewares
app.use(helmetConfig);
app.use(corsOptions);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionConfig);
app.use(logger);

// Static folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.send({ message: 'API is running on /api' });
});

// Routes
app.use('/api/users', users);
app.use('/api/posts', posts);

// Catch all error
app.use(notFound);

// Error handler
app.use(errorHandler);

/**
 * Server Activation
 */
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
