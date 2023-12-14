import 'reflect-metadata';
import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import Router from './routes';
import 'dotenv/config';
import { dataSource } from './config/database';

console.log("ko");
const app = express();

// Establish a database connection using dataSource
dataSource
    .initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
        process.exit(1);
    });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(express.static('public'));

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

// Swagger UI
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  })
);

// Routes
app.use(Router);

// Error Handling
app.use((req, res, next) => {
    const error = new Error('Route not found');
    res.status(404).json({
        message: error.message
    });
});

// Start the server
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 8000; 

httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

export default app;
