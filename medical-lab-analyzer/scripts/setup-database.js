const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Ensure database directory exists
const dbDir = path.join(__dirname, '..', 'database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'medical_lab.db');
const db = new Database(dbPath);

console.log('Setting up medical lab database...');

// Create tables
db.exec(`
  -- Users table
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'doctor', 'technician')),
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Patients table
  CREATE TABLE IF NOT EXISTS patients (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    gender TEXT NOT NULL CHECK (gender IN ('male', 'female')),
    phone TEXT NOT NULL,
    email TEXT,
    address TEXT,
    medical_history TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Test types table
  CREATE TABLE IF NOT EXISTS test_types (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    normal_range TEXT,
    unit TEXT,
    price REAL NOT NULL,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Tests table
  CREATE TABLE IF NOT EXISTS tests (
    id TEXT PRIMARY KEY,
    patient_id TEXT NOT NULL,
    test_type_id TEXT NOT NULL,
    doctor_id TEXT NOT NULL,
    technician_id TEXT,
    status TEXT NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
    requested_date DATETIME NOT NULL,
    completed_date DATETIME,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients (id),
    FOREIGN KEY (test_type_id) REFERENCES test_types (id),
    FOREIGN KEY (doctor_id) REFERENCES users (id),
    FOREIGN KEY (technician_id) REFERENCES users (id)
  );

  -- Test results table
  CREATE TABLE IF NOT EXISTS test_results (
    id TEXT PRIMARY KEY,
    test_id TEXT NOT NULL,
    parameter TEXT NOT NULL,
    value TEXT NOT NULL,
    unit TEXT,
    normal_range TEXT,
    is_abnormal BOOLEAN DEFAULT 0,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (test_id) REFERENCES tests (id)
  );

  -- Test images table
  CREATE TABLE IF NOT EXISTS test_images (
    id TEXT PRIMARY KEY,
    test_id TEXT NOT NULL,
    filename TEXT NOT NULL,
    original_name TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    size INTEGER NOT NULL,
    path TEXT NOT NULL,
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (test_id) REFERENCES tests (id)
  );

  -- Image analysis results table
  CREATE TABLE IF NOT EXISTS image_analysis_results (
    id TEXT PRIMARY KEY,
    image_id TEXT NOT NULL,
    analysis_type TEXT NOT NULL CHECK (analysis_type IN ('cell_count', 'color_analysis', 'abnormal_detection', 'general')),
    results TEXT NOT NULL, -- JSON string
    confidence REAL NOT NULL,
    processed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (image_id) REFERENCES test_images (id)
  );

  -- Reports table
  CREATE TABLE IF NOT EXISTS reports (
    id TEXT PRIMARY KEY,
    test_id TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    format TEXT NOT NULL CHECK (format IN ('pdf', 'html', 'docx')),
    generated_by TEXT NOT NULL,
    generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    file_path TEXT,
    FOREIGN KEY (test_id) REFERENCES tests (id),
    FOREIGN KEY (generated_by) REFERENCES users (id)
  );

  -- Create indexes for better performance
  CREATE INDEX IF NOT EXISTS idx_tests_patient_id ON tests (patient_id);
  CREATE INDEX IF NOT EXISTS idx_tests_status ON tests (status);
  CREATE INDEX IF NOT EXISTS idx_tests_requested_date ON tests (requested_date);
  CREATE INDEX IF NOT EXISTS idx_test_results_test_id ON test_results (test_id);
  CREATE INDEX IF NOT EXISTS idx_test_images_test_id ON test_images (test_id);
  CREATE INDEX IF NOT EXISTS idx_patients_name ON patients (name);
  CREATE INDEX IF NOT EXISTS idx_users_username ON users (username);
`);

// Insert sample data
const insertSampleData = () => {
  console.log('Inserting sample data...');

  // Insert sample users
  const bcrypt = require('bcryptjs');
  const hashedPassword = bcrypt.hashSync('password123', 10);

  db.prepare(`
    INSERT OR IGNORE INTO users (id, username, email, password_hash, role, name)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run('user_001', 'admin', 'admin@medicallab.com', hashedPassword, 'admin', 'مدير النظام');

  db.prepare(`
    INSERT OR IGNORE INTO users (id, username, email, password_hash, role, name)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run('user_002', 'doctor1', 'doctor1@medicallab.com', hashedPassword, 'doctor', 'د. أحمد محمد');

  db.prepare(`
    INSERT OR IGNORE INTO users (id, username, email, password_hash, role, name)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run('user_003', 'tech1', 'tech1@medicallab.com', hashedPassword, 'technician', 'فني مختبر');

  // Insert sample test types
  db.prepare(`
    INSERT OR IGNORE INTO test_types (id, name, description, category, normal_range, unit, price)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run('type_001', 'تحليل الدم الشامل', 'فحص شامل لخلايا الدم', 'دم', '4.5-5.5', 'مليون/ميكرولتر', 150.0);

  db.prepare(`
    INSERT OR IGNORE INTO test_types (id, name, description, category, normal_range, unit, price)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run('type_002', 'تحليل البول', 'فحص شامل للبول', 'بول', 'pH: 4.5-8.0', 'pH', 80.0);

  db.prepare(`
    INSERT OR IGNORE INTO test_types (id, name, description, category, normal_range, unit, price)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run('type_003', 'تحليل الكوليسترول', 'فحص مستوى الكوليسترول', 'كيمياء حيوية', '<200', 'ملجم/دل', 120.0);

  // Insert sample patients
  db.prepare(`
    INSERT OR IGNORE INTO patients (id, name, date_of_birth, gender, phone, email)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run('patient_001', 'أحمد محمد علي', '1985-03-15', 'male', '+966501234567', 'ahmed@email.com');

  db.prepare(`
    INSERT OR IGNORE INTO patients (id, name, date_of_birth, gender, phone, email)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run('patient_002', 'فاطمة أحمد حسن', '1990-07-22', 'female', '+966507654321', 'fatima@email.com');

  db.prepare(`
    INSERT OR IGNORE INTO patients (id, name, date_of_birth, gender, phone, email)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run('patient_003', 'محمد عبدالله سالم', '1978-11-08', 'male', '+966509876543', 'mohammed@email.com');

  console.log('Sample data inserted successfully!');
};

insertSampleData();

console.log('Database setup completed successfully!');
console.log(`Database file created at: ${dbPath}`);

db.close();