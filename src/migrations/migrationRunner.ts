// src/migrations/migrationRunner.ts
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';


// Load environment variables
dotenv.config();

// Get database configuration from environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Create migration table if it doesn't exist
async function initMigrationTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

// Check which migrations have been applied
async function getAppliedMigrations(): Promise<string[]> {
  const result = await pool.query('SELECT name FROM migrations');
  return result.rows.map(row => row.name);
}

// Apply pending migrations
async function runMigrations() {
  console.log('Running database migrations...');
  
  // Initialize migration tracking table
  await initMigrationTable();
  
  // Get already applied migrations
  const appliedMigrations = await getAppliedMigrations();
  
  // Get all migration files
  const migrationDir = path.join(__dirname, 'scripts');
  const migrationFiles = fs.readdirSync(migrationDir)
    .filter(file => file.endsWith('.sql'))
    .sort(); // Ensure migrations run in order
  
  // Run each pending migration
  for (const file of migrationFiles) {
    if (!appliedMigrations.includes(file)) {
      console.log(`Applying migration: ${file}`);
      
      const migrationPath = path.join(migrationDir, file);
      const migrationSql = fs.readFileSync(migrationPath, 'utf8');
      
      // Start a transaction for the migration
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        
        // Run the migration script
        await client.query(migrationSql);
        
        // Record the migration as applied
        await client.query(
          'INSERT INTO migrations (name) VALUES ($1)',
          [file]
        );
        
        await client.query('COMMIT');
        console.log(`Migration ${file} applied successfully`);
      } catch (error) {
        await client.query('ROLLBACK');
        console.error(`Error applying migration ${file}:`, error);
        throw error;
      } finally {
        client.release();
      }
    } else {
      console.log(`Migration ${file} already applied, skipping`);
    }
  }
  
  console.log('Database migrations completed');
}

// Function to run migrations from server startup
export async function migrateDatabase() {
  try {
    await runMigrations();
    return true;
  } catch (error) {
    console.error('Migration failed:', error);
    return false;
  } finally {
    // Don't close the pool here since other parts of the app will use it
  }
}