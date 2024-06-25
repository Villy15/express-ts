import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../../package.json';

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
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express-Typscript API',
      termsOfService: 'https://smartbear.com/terms-of-use/',
      version,
      description:
        'This is an API documentation from the Express-Typescript github repository.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.',
      contact: {
        email: 'adrianvill07@gmail.com',
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC',
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    host: 'localhost:3000',
    basePath: '/',
    tags: swaggerTags,
    schemes: ['https', 'http'],
    externalDocs: {
      description: 'Find out more about this API',
      url: 'https://github.com/Villy15/express-ts',
    },
    consumes: ['application/json'],
    produces: ['application/json'],
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

  console.log(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
