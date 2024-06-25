import express from 'express';
import path from 'path';

import corsOptions from './middlewares/cors.middleware';
import errorHandler from './middlewares/error.middleware';
import helmetConfig from './middlewares/helmet.middleware';
import logger from './middlewares/logger.middleware';
import notFound from './middlewares/not-found.middlware';
import sessionConfig from './middlewares/session.middleware';

import router from './app/routes/routes';
import log from './utils/logger';
import swaggerDocs from './utils/swagger';

const port = process.env.PORT || 5000;

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

//
swaggerDocs(app, port);

// Routes
app.use(router);

// Catch all error
app.use(notFound);

// Error handler
app.use(errorHandler);

/**
 * Server Activation
 */
app.listen(port, () => {
  log.info(`Server is running on http://localhost:${port}`);
});
