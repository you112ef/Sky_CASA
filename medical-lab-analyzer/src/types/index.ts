export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'doctor' | 'technician';
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: Date;
  gender: 'male' | 'female';
  phone: string;
  email?: string;
  address?: string;
  medicalHistory?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestType {
  id: string;
  name: string;
  description: string;
  category: string;
  normalRange?: string;
  unit?: string;
  price: number;
  isActive: boolean;
}

export interface Test {
  id: string;
  patientId: string;
  testTypeId: string;
  doctorId: string;
  technicianId?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  requestedDate: Date;
  completedDate?: Date;
  notes?: string;
  results?: TestResult[];
  images?: TestImage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TestResult {
  id: string;
  testId: string;
  parameter: string;
  value: string;
  unit?: string;
  normalRange?: string;
  isAbnormal: boolean;
  notes?: string;
  createdAt: Date;
}

export interface TestImage {
  id: string;
  testId: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  analysisResults?: ImageAnalysisResult;
  uploadedAt: Date;
}

export interface ImageAnalysisResult {
  id: string;
  imageId: string;
  analysisType: 'cell_count' | 'color_analysis' | 'abnormal_detection' | 'general';
  results: Record<string, any>;
  confidence: number;
  processedAt: Date;
  notes?: string;
}

export interface Report {
  id: string;
  testId: string;
  title: string;
  content: string;
  format: 'pdf' | 'html' | 'docx';
  generatedBy: string;
  generatedAt: Date;
  filePath?: string;
}

export interface DashboardStats {
  totalPatients: number;
  totalTests: number;
  completedTests: number;
  pendingTests: number;
  todayTests: number;
  monthlyRevenue: number;
  recentTests: Test[];
  recentPatients: Patient[];
}