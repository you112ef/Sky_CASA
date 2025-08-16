"use client";

import { useState, useEffect } from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import PatientForm from "@/components/forms/PatientForm";
import ImageAnalysis from "@/components/dashboard/ImageAnalysis";
import { DashboardStats, Patient, ImageAnalysisResult } from "@/types";
import { getDashboardStats, createPatient, saveImageAnalysisResult } from "@/services/databaseService";

export default function DashboardPage() {
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [showImageAnalysis, setShowImageAnalysis] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'image-analysis'>('dashboard');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      const dashboardStats = await getDashboardStats();
      setStats(dashboardStats);
      setError(null);
    } catch (err) {
      setError('فشل في تحميل بيانات لوحة التحكم');
      console.error('Failed to load dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPatient = async (patientData: Partial<Patient>) => {
    try {
      const newPatient = await createPatient(patientData);
      console.log("تم إضافة مريض جديد:", newPatient);
      
      // إعادة تحميل الإحصائيات لتحديث العداد
      await loadDashboardStats();
      
      setShowPatientForm(false);
      
      // يمكن إضافة إشعار نجاح هنا
      alert('تم إضافة المريض بنجاح!');
    } catch (err) {
      console.error('Failed to create patient:', err);
      alert('فشل في إضافة المريض. يرجى المحاولة مرة أخرى.');
    }
  };

  const handleImageAnalysisComplete = async (results: ImageAnalysisResult) => {
    try {
      await saveImageAnalysisResult(results);
      console.log("تم حفظ نتائج تحليل الصورة:", results);
      
      // يمكن إضافة إشعار نجاح هنا
      alert('تم حفظ نتائج تحليل الصورة بنجاح!');
    } catch (err) {
      console.error('Failed to save image analysis result:', err);
      alert('فشل في حفظ نتائج تحليل الصورة. يرجى المحاولة مرة أخرى.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">خطأ في التحميل</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadDashboardStats}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

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

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">لا توجد بيانات</h2>
          <p className="text-gray-600">لم يتم العثور على بيانات لوحة التحكم</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Dashboard stats={stats} />
      
      {showPatientForm && (
        <PatientForm
          onSubmit={handleAddPatient}
          onCancel={() => setShowPatientForm(false)}
        />
      )}
    </>
  );
}