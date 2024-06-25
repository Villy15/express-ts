import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../../package.json';
import log from './logger';

const swaggerTags = [
  {
    name: 'posts',
    description: 'user posts endpoints',
  },
  {
    name: 'users',
    description: 'user endpoints',
  },
];

const options: swaggerJsdoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Express-Typscript API',
      termsOfService: 'https://smartbear.com/terms-of-use/',
      version,
      description:
        'This is an API documentation from the Express-Typescript github repository. For this sample, you can use the api key `special-key` to test the authorization filters.',
      contact: {
        email: 'adrianvill07@gmail.com',
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC',
      },
    },
    servers: [
      {
        url: 'http://localhost:8080/',
        description: 'Development server',
      },
      {
        url: 'http://localhost:3000/',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        api_key: {
          type: 'apiKey',
          name: 'api_key',
          in: 'header',
        },
        app_auth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'app_auth',
          description: 'Bearer token for authentication',
        },
      },
    },
    security: [
      {
        api_key: [],
      },
      {
        app_auth: [],
      },
    ],
    tags: swaggerTags,
    externalDocs: {
      description: 'Find out more about this API',
      url: 'https://github.com/Villy15/express-ts',
    },
  },

  apis: ['./src/app/api/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number | string) {
  // Swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  log.info(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
