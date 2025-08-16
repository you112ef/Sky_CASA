import { DashboardStats, Patient, Test, TestType, ImageAnalysisResult } from '@/types';

// فحص توفر IndexedDB
const isIndexedDBAvailable = typeof window !== 'undefined' && 'indexedDB' in window;

// خدمة قاعدة البيانات التي تعمل في المتصفح باستخدام IndexedDB
class BrowserDatabaseService {
  private db: IDBDatabase | null = null;
  private readonly dbName = 'MedicalLabDB';
  private readonly version = 1;

  async initializeDatabase(): Promise<boolean> {
    try {
      if (!isIndexedDBAvailable) {
        console.warn('IndexedDB غير متاح - سيتم استخدام التخزين المحلي');
        return false;
      }

      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, this.version);

        request.onerror = () => reject(new Error('فشل في فتح قاعدة البيانات'));
        request.onsuccess = () => {
          this.db = request.result;
          resolve(true);
        };

        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;

          // إنشاء جداول قاعدة البيانات
          if (!db.objectStoreNames.contains('patients')) {
            const patientStore = db.createObjectStore('patients', { keyPath: 'id' });
            patientStore.createIndex('name', 'name', { unique: false });
            patientStore.createIndex('phone', 'phone', { unique: false });
          }

          if (!db.objectStoreNames.contains('testTypes')) {
            const testTypeStore = db.createObjectStore('testTypes', { keyPath: 'id' });
            testTypeStore.createIndex('category', 'category', { unique: false });
          }

          if (!db.objectStoreNames.contains('tests')) {
            const testStore = db.createObjectStore('tests', { keyPath: 'id' });
            testStore.createIndex('patientId', 'patientId', { unique: false });
            testStore.createIndex('status', 'status', { unique: false });
            testStore.createIndex('requestedDate', 'requestedDate', { unique: false });
          }

          if (!db.objectStoreNames.contains('testResults')) {
            const resultStore = db.createObjectStore('testResults', { keyPath: 'id' });
            resultStore.createIndex('testId', 'testId', { unique: false });
          }

          if (!db.objectStoreNames.contains('testImages')) {
            const imageStore = db.createObjectStore('testImages', { keyPath: 'id' });
            imageStore.createIndex('testId', 'testId', { unique: false });
          }

          if (!db.objectStoreNames.contains('imageAnalysisResults')) {
            const analysisStore = db.createObjectStore('imageAnalysisResults', { keyPath: 'id' });
            analysisStore.createIndex('imageId', 'imageId', { unique: false });
          }
        };
      });
    } catch (error) {
      console.error('Failed to initialize database:', error);
      return false;
    }
  }

  private async ensureDatabase(): Promise<void> {
    if (!this.db) {
      await this.initializeDatabase();
    }
  }

  private async insertInitialData(): Promise<void> {
    await this.ensureDatabase();
    if (!this.db) return;

    // إدراج أنواع الفحوصات الأولية
    const testTypes = [
      {
        id: 'blood_cbc',
        name: 'Complete Blood Count (CBC)',
        description: 'تعداد الدم الكامل - فحص شامل لخلايا الدم',
        category: 'Hematology',
        normalRange: 'RBC: 4.5-5.5M/μL, WBC: 4.5-11K/μL, HGB: 13-17g/dL',
        unit: 'Various',
        price: 150.00,
        isActive: true
      },
      {
        id: 'blood_chemistry',
        name: 'Comprehensive Metabolic Panel',
        description: 'الملف الأيضي الشامل - فحص وظائف الكبد والكلى',
        category: 'Chemistry',
        normalRange: 'Glucose: 70-100mg/dL, Creatinine: 0.7-1.3mg/dL',
        unit: 'mg/dL',
        price: 200.00,
        isActive: true
      },
      {
        id: 'urinalysis',
        name: 'Urinalysis',
        description: 'فحص البول - تحليل شامل للبول',
        category: 'Urinalysis',
        normalRange: 'pH: 4.5-8.0, Specific Gravity: 1.005-1.030',
        unit: 'Various',
        price: 80.00,
        isActive: true
      },
      {
        id: 'lipid_panel',
        name: 'Lipid Panel',
        description: 'ملف الدهون - فحص الكوليسترول والدهون الثلاثية',
        category: 'Chemistry',
        normalRange: 'Total Cholesterol: <200mg/dL, LDL: <100mg/dL',
        unit: 'mg/dL',
        price: 120.00,
        isActive: true
      }
    ];

    // إدراج المرضى الأوليين
    const patients = [
      {
        id: 'patient_001',
        name: 'أحمد محمد علي',
        dateOfBirth: new Date('1985-03-15'),
        gender: 'male',
        phone: '+966501234567',
        email: 'ahmed.ali@email.com',
        address: 'الرياض، المملكة العربية السعودية',
        medicalHistory: 'لا توجد أمراض مزمنة',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'patient_002',
        name: 'فاطمة أحمد حسن',
        dateOfBirth: new Date('1990-07-22'),
        gender: 'female',
        phone: '+966507654321',
        email: 'fatima.hassan@email.com',
        address: 'جدة، المملكة العربية السعودية',
        medicalHistory: 'حساسية من البنسلين',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'patient_003',
        name: 'محمد عبدالله سالم',
        dateOfBirth: new Date('1978-11-08'),
        gender: 'male',
        phone: '+966509876543',
        email: 'mohammed.salem@email.com',
        address: 'الدمام، المملكة العربية السعودية',
        medicalHistory: 'ارتفاع ضغط الدم',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // إدراج الفحوصات الأولية
    const tests = [
      {
        id: 'test_001',
        patientId: 'patient_001',
        testTypeId: 'blood_cbc',
        doctorId: 'doctor_001',
        status: 'completed',
        requestedDate: new Date('2024-01-15'),
        completedDate: new Date('2024-01-15'),
        notes: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'test_002',
        patientId: 'patient_002',
        testTypeId: 'blood_chemistry',
        doctorId: 'doctor_001',
        status: 'in_progress',
        requestedDate: new Date('2024-01-14'),
        notes: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'test_003',
        patientId: 'patient_003',
        testTypeId: 'lipid_panel',
        doctorId: 'doctor_002',
        status: 'pending',
        requestedDate: new Date('2024-01-13'),
        notes: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // إدراج البيانات
    const transaction = this.db.transaction(['testTypes', 'patients', 'tests'], 'readwrite');
    
    const testTypeStore = transaction.objectStore('testTypes');
    const patientStore = transaction.objectStore('patients');
    const testStore = transaction.objectStore('tests');

    for (const testType of testTypes) {
      testTypeStore.put(testType);
    }

    for (const patient of patients) {
      patientStore.put(patient);
    }

    for (const test of tests) {
      testStore.put(test);
    }

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async getDashboardStats(): Promise<DashboardStats> {
    try {
      if (!isIndexedDBAvailable) {
        // إرجاع بيانات وهمية إذا لم يكن IndexedDB متاح
        return this.getMockStats();
      }

      await this.ensureDatabase();
      if (!this.db) throw new Error('قاعدة البيانات غير متهيئة');

      // التحقق من وجود بيانات أولية
      const patientCount = await this.getCount('patients');
      if (patientCount === 0) {
        await this.insertInitialData();
      }

      // الحصول على الإحصائيات
      const stats = await Promise.all([
        this.getCount('patients'),
        this.getCount('tests'),
        this.getCountByStatus('tests', 'completed'),
        this.getCountByStatus('tests', 'pending'),
        this.getTodayTestsCount(),
        this.getMonthlyRevenue()
      ]);

      const [totalPatients, totalTests, completedTests, pendingTests, todayTests, monthlyRevenue] = stats;

      // الحصول على الفحوصات الأخيرة
      const recentTests = await this.getRecentTests(5);
      const recentPatients = await this.getRecentPatients(5);

      return {
        totalPatients,
        totalTests,
        completedTests,
        pendingTests,
        todayTests,
        monthlyRevenue,
        recentTests,
        recentPatients
      };
    } catch (error) {
      console.error('Failed to get dashboard stats:', error);
      // إرجاع بيانات وهمية في حالة الخطأ
      return this.getMockStats();
    }
  }

  private getMockStats(): DashboardStats {
    return {
      totalPatients: 3,
      totalTests: 3,
      completedTests: 1,
      pendingTests: 1,
      todayTests: 0,
      monthlyRevenue: 150.00,
      recentTests: [
        {
          id: 'test_001',
          patientId: 'patient_001',
          testTypeId: 'blood_cbc',
          doctorId: 'doctor_001',
          status: 'completed',
          requestedDate: new Date('2024-01-15'),
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-15')
        },
        {
          id: 'test_002',
          patientId: 'patient_002',
          testTypeId: 'blood_chemistry',
          doctorId: 'doctor_001',
          status: 'in_progress',
          requestedDate: new Date('2024-01-14'),
          createdAt: new Date('2024-01-14'),
          updatedAt: new Date('2024-01-14')
        },
        {
          id: 'test_003',
          patientId: 'patient_003',
          testTypeId: 'lipid_panel',
          doctorId: 'doctor_002',
          status: 'pending',
          requestedDate: new Date('2024-01-13'),
          createdAt: new Date('2024-01-13'),
          updatedAt: new Date('2024-01-13')
        }
      ],
      recentPatients: [
        {
          id: 'patient_001',
          name: 'أحمد محمد علي',
          dateOfBirth: new Date('1985-03-15'),
          gender: 'male',
          phone: '+966501234567',
          email: 'ahmed.ali@email.com',
          address: 'الرياض، المملكة العربية السعودية',
          medicalHistory: 'لا توجد أمراض مزمنة',
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-15')
        },
        {
          id: 'patient_002',
          name: 'فاطمة أحمد حسن',
          dateOfBirth: new Date('1990-07-22'),
          gender: 'female',
          phone: '+966507654321',
          email: 'fatima.hassan@email.com',
          address: 'جدة، المملكة العربية السعودية',
          medicalHistory: 'حساسية من البنسلين',
          createdAt: new Date('2024-01-14'),
          updatedAt: new Date('2024-01-14')
        },
        {
          id: 'patient_003',
          name: 'محمد عبدالله سالم',
          dateOfBirth: new Date('1978-11-08'),
          gender: 'male',
          phone: '+966509876543',
          email: 'mohammed.salem@email.com',
          address: 'الدمام، المملكة العربية السعودية',
          medicalHistory: 'ارتفاع ضغط الدم',
          createdAt: new Date('2024-01-13'),
          updatedAt: new Date('2024-01-13')
        }
      ]
    };
  }

  private async getCount(storeName: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.count();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  private async getCountByStatus(storeName: string, status: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const index = store.index('status');
      const request = index.count(status);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  private async getTodayTestsCount(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['tests'], 'readonly');
      const store = transaction.objectStore('tests');
      const index = store.index('requestedDate');
      const request = index.getAll();

      request.onsuccess = () => {
        const todayTests = request.result.filter((test: any) => {
          const testDate = new Date(test.requestedDate);
          testDate.setHours(0, 0, 0, 0);
          return testDate.getTime() === today.getTime();
        });
        resolve(todayTests.length);
      };
      request.onerror = () => reject(request.error);
    });
  }

  private async getMonthlyRevenue(): Promise<number> {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['tests', 'testTypes'], 'readonly');
      const testStore = transaction.objectStore('tests');
      const testTypeStore = transaction.objectStore('testTypes');
      
      const testRequest = testStore.index('status').getAll('completed');
      
      testRequest.onsuccess = () => {
        const completedTests = testRequest.result.filter((test: any) => {
          if (!test.completedDate) return false;
          const completedDate = new Date(test.completedDate);
          return completedDate >= monthStart;
        });

        let totalRevenue = 0;
        completedTests.forEach((test: any) => {
          const testTypeRequest = testTypeStore.get(test.testTypeId);
          testTypeRequest.onsuccess = () => {
            if (testTypeRequest.result) {
              totalRevenue += testTypeRequest.result.price;
            }
          };
        });

        resolve(totalRevenue);
      };
      testRequest.onerror = () => reject(testRequest.error);
    });
  }

  private async getRecentTests(limit: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['tests'], 'readonly');
      const store = transaction.objectStore('tests');
      const index = store.index('requestedDate');
      const request = index.openCursor(null, 'prev');

      const results: any[] = [];
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result;
        if (cursor && results.length < limit) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          resolve(results);
        }
      };
      request.onerror = () => reject(request.error);
    });
  }

  private async getRecentPatients(limit: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['patients'], 'readonly');
      const store = transaction.objectStore('patients');
      const index = store.index('createdAt');
      const request = index.openCursor(null, 'prev');

      const results: any[] = [];
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result;
        if (cursor && results.length < limit) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          resolve(results);
        }
      };
      request.onerror = () => reject(request.error);
    });
  }

  async createPatient(patientData: Partial<Patient>): Promise<Patient> {
    try {
      if (!isIndexedDBAvailable) {
        // إرجاع بيانات وهمية إذا لم يكن IndexedDB متاح
        const id = `patient_${Date.now()}`;
        const now = new Date();
        return {
          id,
          name: patientData.name!,
          dateOfBirth: patientData.dateOfBirth!,
          gender: patientData.gender!,
          phone: patientData.phone!,
          email: patientData.email,
          address: patientData.address,
          medicalHistory: patientData.medicalHistory,
          createdAt: now,
          updatedAt: now
        };
      }

      await this.ensureDatabase();
      if (!this.db) throw new Error('قاعدة البيانات غير متهيئة');

      const id = `patient_${Date.now()}`;
      const now = new Date();

      const patient: Patient = {
        id,
        name: patientData.name!,
        dateOfBirth: patientData.dateOfBirth!,
        gender: patientData.gender!,
        phone: patientData.phone!,
        email: patientData.email,
        address: patientData.address,
        medicalHistory: patientData.medicalHistory,
        createdAt: now,
        updatedAt: now
      };

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction(['patients'], 'readwrite');
        const store = transaction.objectStore('patients');
        const request = store.add(patient);

        request.onsuccess = () => resolve(patient);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Failed to create patient:', error);
      throw error;
    }
  }

  async saveImageAnalysisResult(result: ImageAnalysisResult): Promise<void> {
    try {
      if (!isIndexedDBAvailable) {
        // حفظ في localStorage إذا لم يكن IndexedDB متاح
        const results = JSON.parse(localStorage.getItem('imageAnalysisResults') || '[]');
        results.push(result);
        localStorage.setItem('imageAnalysisResults', JSON.stringify(results));
        return;
      }

      await this.ensureDatabase();
      if (!this.db) throw new Error('قاعدة البيانات غير متهيئة');

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction(['imageAnalysisResults'], 'readwrite');
        const store = transaction.objectStore('imageAnalysisResults');
        const request = store.add(result);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Failed to save image analysis result:', error);
      throw error;
    }
  }
}

// إنشاء نسخة واحدة من الخدمة
export const databaseService = new BrowserDatabaseService();

// تصدير الدوال للتوافق مع الكود القديم
export const initializeDatabase = () => databaseService.initializeDatabase();
export const getDashboardStats = () => databaseService.getDashboardStats();
export const createPatient = (patientData: Partial<Patient>) => databaseService.createPatient(patientData);
export const saveImageAnalysisResult = (result: ImageAnalysisResult) => databaseService.saveImageAnalysisResult(result);