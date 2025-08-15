"use client";

import { useState } from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import PatientForm from "@/components/forms/PatientForm";
import ImageAnalysis from "@/components/dashboard/ImageAnalysis";
import { DashboardStats, Patient, ImageAnalysisResult } from "@/types";

// Mock data for demonstration
const mockStats: DashboardStats = {
  totalPatients: 1247,
  totalTests: 3456,
  completedTests: 2890,
  pendingTests: 566,
  todayTests: 45,
  monthlyRevenue: 125000,
  recentTests: [
    {
      id: "test_001",
      patientId: "patient_001",
      testTypeId: "type_001",
      doctorId: "doctor_001",
      status: "completed",
      requestedDate: new Date("2024-01-15"),
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-15"),
    },
    {
      id: "test_002",
      patientId: "patient_002",
      testTypeId: "type_002",
      doctorId: "doctor_001",
      status: "in_progress",
      requestedDate: new Date("2024-01-14"),
      createdAt: new Date("2024-01-14"),
      updatedAt: new Date("2024-01-14"),
    },
    {
      id: "test_003",
      patientId: "patient_003",
      testTypeId: "type_001",
      doctorId: "doctor_002",
      status: "pending",
      requestedDate: new Date("2024-01-13"),
      createdAt: new Date("2024-01-13"),
      updatedAt: new Date("2024-01-13"),
    },
  ],
  recentPatients: [
    {
      id: "patient_001",
      name: "أحمد محمد علي",
      dateOfBirth: new Date("1985-03-15"),
      gender: "male",
      phone: "+966501234567",
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-15"),
    },
    {
      id: "patient_002",
      name: "فاطمة أحمد حسن",
      dateOfBirth: new Date("1990-07-22"),
      gender: "female",
      phone: "+966507654321",
      createdAt: new Date("2024-01-14"),
      updatedAt: new Date("2024-01-14"),
    },
    {
      id: "patient_003",
      name: "محمد عبدالله سالم",
      dateOfBirth: new Date("1978-11-08"),
      gender: "male",
      phone: "+966509876543",
      createdAt: new Date("2024-01-13"),
      updatedAt: new Date("2024-01-13"),
    },
  ],
};

export default function DashboardPage() {
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [showImageAnalysis, setShowImageAnalysis] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'image-analysis'>('dashboard');

  const handleAddPatient = (patientData: Partial<Patient>) => {
    console.log("Adding new patient:", patientData);
    // TODO: Implement patient creation logic
    setShowPatientForm(false);
  };

  const handleImageAnalysisComplete = (results: ImageAnalysisResult) => {
    console.log("Image analysis completed:", results);
    // TODO: Save analysis results to database
  };

  if (currentView === 'image-analysis') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">تحليل الصور الطبية</h1>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="text-blue-600 hover:text-blue-800"
            >
              العودة للوحة التحكم
            </button>
          </div>
          <ImageAnalysis
            testId="test_001"
            onAnalysisComplete={handleImageAnalysisComplete}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <Dashboard stats={mockStats} />
      
      {showPatientForm && (
        <PatientForm
          onSubmit={handleAddPatient}
          onCancel={() => setShowPatientForm(false)}
        />
      )}
    </>
  );
}