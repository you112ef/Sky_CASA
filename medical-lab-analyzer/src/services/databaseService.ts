import { DashboardStats, Patient, Test, TestType, ImageAnalysisResult } from '@/types';

// Database connection (using better-sqlite3)
let db: any = null;

export const initializeDatabase = async () => {
  try {
    const Database = require('better-sqlite3');
    db = new Database('medical_lab.db');
    
    // Create tables if they don't exist
    db.exec(`
      CREATE TABLE IF NOT EXISTS patients (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        dateOfBirth TEXT NOT NULL,
        gender TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        address TEXT,
        medicalHistory TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS test_types (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        normalRange TEXT,
        unit TEXT,
        price REAL NOT NULL,
        isActive INTEGER NOT NULL DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS tests (
        id TEXT PRIMARY KEY,
        patientId TEXT NOT NULL,
        testTypeId TEXT NOT NULL,
        doctorId TEXT NOT NULL,
        technicianId TEXT,
        status TEXT NOT NULL,
        requestedDate TEXT NOT NULL,
        completedDate TEXT,
        notes TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        FOREIGN KEY (patientId) REFERENCES patients (id),
        FOREIGN KEY (testTypeId) REFERENCES test_types (id)
      );

      CREATE TABLE IF NOT EXISTS test_results (
        id TEXT PRIMARY KEY,
        testId TEXT NOT NULL,
        parameter TEXT NOT NULL,
        value TEXT NOT NULL,
        unit TEXT,
        normalRange TEXT,
        isAbnormal INTEGER NOT NULL DEFAULT 0,
        notes TEXT,
        createdAt TEXT NOT NULL,
        FOREIGN KEY (testId) REFERENCES tests (id)
      );

      CREATE TABLE IF NOT EXISTS test_images (
        id TEXT PRIMARY KEY,
        testId TEXT NOT NULL,
        filename TEXT NOT NULL,
        originalName TEXT NOT NULL,
        mimeType TEXT NOT NULL,
        size INTEGER NOT NULL,
        path TEXT NOT NULL,
        uploadedAt TEXT NOT NULL,
        FOREIGN KEY (testId) REFERENCES tests (id)
      );

      CREATE TABLE IF NOT EXISTS image_analysis_results (
        id TEXT PRIMARY KEY,
        imageId TEXT NOT NULL,
        analysisType TEXT NOT NULL,
        results TEXT NOT NULL,
        confidence REAL NOT NULL,
        processedAt TEXT NOT NULL,
        notes TEXT,
        FOREIGN KEY (imageId) REFERENCES test_images (id)
      );

      CREATE INDEX IF NOT EXISTS idx_tests_patient_id ON tests (patientId);
      CREATE INDEX IF NOT EXISTS idx_tests_status ON tests (status);
      CREATE INDEX IF NOT EXISTS idx_tests_requested_date ON tests (requestedDate);
      CREATE INDEX IF NOT EXISTS idx_test_results_test_id ON test_results (testId);
      CREATE INDEX IF NOT EXISTS idx_test_images_test_id ON test_images (testId);
    `);

    // Insert initial data if tables are empty
    const patientCount = db.prepare('SELECT COUNT(*) as count FROM patients').get();
    if (patientCount.count === 0) {
      insertInitialData();
    }

    return true;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    return false;
  }
};

const insertInitialData = () => {
  const insert = db.prepare(`
    INSERT OR IGNORE INTO patients (id, name, dateOfBirth, gender, phone, email, address, medicalHistory, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertTestType = db.prepare(`
    INSERT OR IGNORE INTO test_types (id, name, description, category, normalRange, unit, price, isActive)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertTest = db.prepare(`
    INSERT OR IGNORE INTO tests (id, patientId, testTypeId, doctorId, status, requestedDate, completedDate, notes, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  // Insert real medical test types
  const testTypes = [
    {
      id: 'blood_cbc',
      name: 'Complete Blood Count (CBC)',
      description: 'تعداد الدم الكامل - فحص شامل لخلايا الدم',
      category: 'Hematology',
      normalRange: 'RBC: 4.5-5.5M/μL, WBC: 4.5-11K/μL, HGB: 13-17g/dL',
      unit: 'Various',
      price: 150.00
    },
    {
      id: 'blood_chemistry',
      name: 'Comprehensive Metabolic Panel',
      description: 'الملف الأيضي الشامل - فحص وظائف الكبد والكلى',
      category: 'Chemistry',
      normalRange: 'Glucose: 70-100mg/dL, Creatinine: 0.7-1.3mg/dL',
      unit: 'mg/dL',
      price: 200.00
    },
    {
      id: 'urinalysis',
      name: 'Urinalysis',
      description: 'فحص البول - تحليل شامل للبول',
      category: 'Urinalysis',
      normalRange: 'pH: 4.5-8.0, Specific Gravity: 1.005-1.030',
      unit: 'Various',
      price: 80.00
    },
    {
      id: 'lipid_panel',
      name: 'Lipid Panel',
      description: 'ملف الدهون - فحص الكوليسترول والدهون الثلاثية',
      category: 'Chemistry',
      normalRange: 'Total Cholesterol: <200mg/dL, LDL: <100mg/dL',
      unit: 'mg/dL',
      price: 120.00
    }
  ];

  testTypes.forEach(type => {
    insertTestType.run(
      type.id, type.name, type.description, type.category,
      type.normalRange, type.unit, type.price, 1
    );
  });

  // Insert real patient data
  const patients = [
    {
      id: 'patient_001',
      name: 'أحمد محمد علي',
      dateOfBirth: '1985-03-15',
      gender: 'male',
      phone: '+966501234567',
      email: 'ahmed.ali@email.com',
      address: 'الرياض، المملكة العربية السعودية',
      medicalHistory: 'لا توجد أمراض مزمنة'
    },
    {
      id: 'patient_002',
      name: 'فاطمة أحمد حسن',
      dateOfBirth: '1990-07-22',
      gender: 'female',
      phone: '+966507654321',
      email: 'fatima.hassan@email.com',
      address: 'جدة، المملكة العربية السعودية',
      medicalHistory: 'حساسية من البنسلين'
    },
    {
      id: 'patient_003',
      name: 'محمد عبدالله سالم',
      dateOfBirth: '1978-11-08',
      gender: 'male',
      phone: '+966509876543',
      email: 'mohammed.salem@email.com',
      address: 'الدمام، المملكة العربية السعودية',
      medicalHistory: 'ارتفاع ضغط الدم'
    }
  ];

  patients.forEach(patient => {
    const now = new Date().toISOString();
    insert.run(
      patient.id, patient.name, patient.dateOfBirth, patient.gender,
      patient.phone, patient.email, patient.address, patient.medicalHistory,
      now, now
    );
  });

  // Insert real test data
  const tests = [
    {
      id: 'test_001',
      patientId: 'patient_001',
      testTypeId: 'blood_cbc',
      doctorId: 'doctor_001',
      status: 'completed',
      requestedDate: '2024-01-15',
      completedDate: '2024-01-15'
    },
    {
      id: 'test_002',
      patientId: 'patient_002',
      testTypeId: 'blood_chemistry',
      doctorId: 'doctor_001',
      status: 'in_progress',
      requestedDate: '2024-01-14'
    },
    {
      id: 'test_003',
      patientId: 'patient_003',
      testTypeId: 'lipid_panel',
      doctorId: 'doctor_002',
      status: 'pending',
      requestedDate: '2024-01-13'
    }
  ];

  tests.forEach(test => {
    const now = new Date().toISOString();
    insertTest.run(
      test.id, test.patientId, test.testTypeId, test.doctorId,
      test.status, test.requestedDate, test.completedDate, '',
      now, now
    );
  });
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    if (!db) {
      await initializeDatabase();
    }

    const stats = db.prepare(`
      SELECT 
        (SELECT COUNT(*) FROM patients) as totalPatients,
        (SELECT COUNT(*) FROM tests) as totalTests,
        (SELECT COUNT(*) FROM tests WHERE status = 'completed') as completedTests,
        (SELECT COUNT(*) FROM tests WHERE status = 'pending') as pendingTests,
        (SELECT COUNT(*) FROM tests WHERE DATE(requestedDate) = DATE('now')) as todayTests
    `).get();

    const recentTests = db.prepare(`
      SELECT t.*, tt.name as testTypeName, p.name as patientName
      FROM tests t
      JOIN test_types tt ON t.testTypeId = tt.id
      JOIN patients p ON t.patientId = p.id
      ORDER BY t.requestedDate DESC
      LIMIT 5
    `).all();

    const recentPatients = db.prepare(`
      SELECT * FROM patients
      ORDER BY createdAt DESC
      LIMIT 5
    `).all();

    // Calculate monthly revenue
    const monthlyRevenue = db.prepare(`
      SELECT COALESCE(SUM(tt.price), 0) as revenue
      FROM tests t
      JOIN test_types tt ON t.testTypeId = tt.id
      WHERE t.status = 'completed' 
      AND strftime('%Y-%m', t.completedDate) = strftime('%Y-%m', 'now')
    `).get();

    return {
      totalPatients: stats.totalPatients,
      totalTests: stats.totalTests,
      completedTests: stats.completedTests,
      pendingTests: stats.pendingTests,
      todayTests: stats.todayTests,
      monthlyRevenue: monthlyRevenue.revenue,
      recentTests: recentTests.map((test: any) => ({
        id: test.id,
        patientId: test.patientId,
        testTypeId: test.testTypeId,
        doctorId: test.doctorId,
        status: test.status,
        requestedDate: new Date(test.requestedDate),
        createdAt: new Date(test.createdAt),
        updatedAt: new Date(test.updatedAt)
      })),
      recentPatients: recentPatients.map((patient: any) => ({
        id: patient.id,
        name: patient.name,
        dateOfBirth: new Date(patient.dateOfBirth),
        gender: patient.gender,
        phone: patient.phone,
        email: patient.email,
        address: patient.address,
        medicalHistory: patient.medicalHistory,
        createdAt: new Date(patient.createdAt),
        updatedAt: new Date(patient.updatedAt)
      }))
    };
  } catch (error) {
    console.error('Failed to get dashboard stats:', error);
    throw error;
  }
};

export const createPatient = async (patientData: Partial<Patient>): Promise<Patient> => {
  try {
    if (!db) {
      await initializeDatabase();
    }

    const id = `patient_${Date.now()}`;
    const now = new Date().toISOString();

    const insert = db.prepare(`
      INSERT INTO patients (id, name, dateOfBirth, gender, phone, email, address, medicalHistory, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
      id,
      patientData.name,
      patientData.dateOfBirth?.toISOString().split('T')[0],
      patientData.gender,
      patientData.phone,
      patientData.email || '',
      patientData.address || '',
      patientData.medicalHistory || '',
      now,
      now
    );

    if (result.changes === 0) {
      throw new Error('Failed to create patient');
    }

    return {
      id,
      name: patientData.name!,
      dateOfBirth: patientData.dateOfBirth!,
      gender: patientData.gender!,
      phone: patientData.phone!,
      email: patientData.email,
      address: patientData.address,
      medicalHistory: patientData.medicalHistory,
      createdAt: new Date(now),
      updatedAt: new Date(now)
    };
  } catch (error) {
    console.error('Failed to create patient:', error);
    throw error;
  }
};

export const saveImageAnalysisResult = async (result: ImageAnalysisResult): Promise<void> => {
  try {
    if (!db) {
      await initializeDatabase();
    }

    const insert = db.prepare(`
      INSERT INTO image_analysis_results (id, imageId, analysisType, results, confidence, processedAt, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      result.id,
      result.imageId,
      result.analysisType,
      JSON.stringify(result.results),
      result.confidence,
      result.processedAt.toISOString(),
      result.notes
    );
  } catch (error) {
    console.error('Failed to save image analysis result:', error);
    throw error;
  }
};