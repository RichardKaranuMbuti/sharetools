// src/scripts/runMigrations.ts
import { migrateDatabase } from '../migrations/migrationRunner';

async function run() {
  try {
    console.log('Starting database migration...');
    const success = await migrateDatabase();
    
    if (success) {
      console.log('Migration completed successfully');
      process.exit(0);
    } else {
      console.error('Migration failed');
      process.exit(1);
    }
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
}

run();