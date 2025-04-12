import express from 'express';
import { migrateDatabase } from './migrations/migrationRunner';
import routes from './routes';
import pool from './utils/db';

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Configure middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount API routes
app.use('/api', routes);

async function startServer() {
  try {
    // Run database migrations first
    console.log('Running database migrations...');
    const migrationSuccess = await migrateDatabase();
    
    if (!migrationSuccess) {
      console.error('❌ Failed to run database migrations. Exiting.');
      process.exit(1);
    }
    
    console.log('✅ Database migrations completed successfully');
    
    // Test database connection
    await pool.connect();
    console.log('🔌 PostgreSQL connection established successfully');
    
    // Start the server after successful DB connection and migrations
    app.listen(PORT, () => {
      console.log(`🚀 ShareTools API is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error starting server:', err);
    process.exit(1);
  }
}

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

// Start the server
startServer();

export default app;