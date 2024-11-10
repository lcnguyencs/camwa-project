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
    port: Number(process.env.DB_PORT) || 5432, // Ensure port is a number, with default fallback
    dialect: 'postgres',
    // Refined logging option
    logging: process.env.NODE_ENV !== 'production' ? console.log : false,
});

// Test the database connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
        process.exit(1); // Exit if the connection fails
    });

export default sequelize;
