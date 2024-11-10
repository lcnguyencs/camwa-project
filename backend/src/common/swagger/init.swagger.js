import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import attendance from './attendance.swagger.js';
import auth from './auth.swagger.js';
import classAPI from './class.swagger.js';
import course from './course.swagger.js';
import notification from './notification.swagger.js';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation for the backend services',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server',
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
        paths: {
            ...auth,
            ...notification,
            ...course,
            ...classAPI,
            ...attendance,
        },
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc({ swaggerDefinition: swaggerOptions, apis: [] });

function initSwagger(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('Swagger docs available at http://localhost:3000/api-docs');
}

export default initSwagger;
