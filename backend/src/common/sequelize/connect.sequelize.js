// Import required modules
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

// Log the environment variables (optional, useful for debugging)
console.log(`Database Name: ${process.env.DB_NAME}`);
console.log(`Database User: ${process.env.DB_USER}`);
console.log(`Database Password: ${process.env.DB_PASSWORD}`);
console.log(`Database Host: ${process.env.DB_HOST}`);
console.log(`Database Port: ${process.env.DB_PORT}`);

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    // Optionally disable logging in production
    logging: process.env.NODE_ENV !== 'production',
});

// Test the database connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });

export default sequelize;
