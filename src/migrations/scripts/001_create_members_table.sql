-- src/migrations/scripts/001_create_members_table.sql
CREATE TABLE IF NOT EXISTS members (
  member_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  registration_date DATE NOT NULL DEFAULT CURRENT_DATE,
  is_active BOOLEAN DEFAULT TRUE
);

-- src/migrations/scripts/002_create_tool_categories_table.sql
CREATE TABLE IF NOT EXISTS tool_categories (
  category_id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT
);

-- src/migrations/scripts/003_create_tools_table.sql
CREATE TABLE IF NOT EXISTS tools (
  tool_id SERIAL PRIMARY KEY,
  barcode VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  category_id INTEGER NOT NULL REFERENCES tool_categories(category_id) ON DELETE RESTRICT,
  description TEXT,
  brand VARCHAR(50),
  model VARCHAR(50),
  serial_number VARCHAR(50) UNIQUE,
  purchase_date DATE,
  purchase_cost DECIMAL(10, 2) CHECK (purchase_cost >= 0),
  replacement_value DECIMAL(10, 2) CHECK (replacement_value >= 0),
  current_condition VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'AVAILABLE'
);

-- src/migrations/scripts/004_create_borrowing_transactions_table.sql
CREATE TABLE IF NOT EXISTS borrowing_transactions (
  transaction_id SERIAL PRIMARY KEY,
  tool_id INTEGER NOT NULL REFERENCES tools(tool_id) ON DELETE RESTRICT,
  member_id INTEGER NOT NULL REFERENCES members(member_id) ON DELETE RESTRICT,
  checkout_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  due_date TIMESTAMP NOT NULL,
  return_date TIMESTAMP,
  condition_before VARCHAR(20) NOT NULL,
  condition_after VARCHAR(20),
  notes TEXT
);

-- src/migrations/scripts/005_create_maintenance_records_table.sql
CREATE TABLE IF NOT EXISTS maintenance_records (
  record_id SERIAL PRIMARY KEY,
  tool_id INTEGER NOT NULL REFERENCES tools(tool_id) ON DELETE CASCADE,
  schedule_id INTEGER,
  maintenance_date DATE NOT NULL DEFAULT CURRENT_DATE,
  maintenance_type VARCHAR(50) NOT NULL,
  description TEXT,
  performed_by VARCHAR(100),
  cost DECIMAL(10, 2) CHECK (cost >= 0),
  parts_replaced TEXT,
  notes TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'COMPLETED'
);

-- src/migrations/scripts/006_create_staff_table.sql
CREATE TABLE IF NOT EXISTS staff (
  staff_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);