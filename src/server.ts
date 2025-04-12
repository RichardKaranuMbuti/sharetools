import express from 'express';
import dotenv from 'dotenv';
import { Pool } from 'pg';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Configure middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PostgreSQL connection setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Test database connection
pool.connect()
  .then(() => {
    console.log('🔌 PostgreSQL connection established successfully');
    
    // Start the server after successful DB connection
    app.listen(PORT, () => {
      console.log(`🚀 ShareTools API is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error connecting to PostgreSQL database:', err);
    process.exit(1);
  });

// Home route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to ShareTools API - Community Tool Sharing Platform',
    status: 'online'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

export default app;