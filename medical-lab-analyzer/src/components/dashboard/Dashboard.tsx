"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Activity, 
  FileText, 
  BarChart3, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from "lucide-react";
import { DashboardStats, Test, Patient } from "@/types";

interface DashboardProps {
  stats: DashboardStats;
}

export default function Dashboard({ stats }: DashboardProps) {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'tests' | 'patients' | 'reports'>('overview');

  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: BarChart3 },
    { id: 'tests', label: 'الفحوصات', icon: Activity },
    { id: 'patients', label: 'المرضى', icon: Users },
    { id: 'reports', label: 'التقارير', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
              <p className="text-gray-600">مرحباً بك في نظام التحليل الطبي المختبري</p>
            </div>
            <div className="flex space-x-3 space-x-reverse">
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 ml-2" />
                بحث
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 ml-2" />
                فحص جديد
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 space-x-reverse">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 ml-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">إجمالي المرضى</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalPatients}</div>
                  <p className="text-xs text-muted-foreground">
                    +20% من الشهر الماضي
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">إجمالي الفحوصات</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalTests}</div>
                  <p className="text-xs text-muted-foreground">
                    +12% من الشهر الماضي
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">الفحوصات المكتملة</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.completedTests}</div>
                  <p className="text-xs text-muted-foreground">
                    {((stats.completedTests / stats.totalTests) * 100).toFixed(1)}% معدل الإنجاز
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">فحوصات اليوم</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.todayTests}</div>
                  <p className="text-xs text-muted-foreground">
                    +5 من أمس
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>آخر الفحوصات</CardTitle>
                  <CardDescription>أحدث الفحوصات المضافة للنظام</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.recentTests.slice(0, 5).map((test) => (
                      <div key={test.id} className="flex items-center space-x-4 space-x-reverse">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Activity className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">فحص #{test.id.slice(0, 8)}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(test.requestedDate).toLocaleDateString('ar-SA')}
                          </p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs ${
                          test.status === 'completed' ? 'bg-green-100 text-green-800' :
                          test.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {test.status === 'completed' ? 'مكتمل' :
                           test.status === 'in_progress' ? 'قيد التنفيذ' :
                           test.status === 'pending' ? 'في الانتظار' : 'ملغي'}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>آخر المرضى</CardTitle>
                  <CardDescription>أحدث المرضى المسجلين في النظام</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.recentPatients.slice(0, 5).map((patient) => (
                      <div key={patient.id} className="flex items-center space-x-4 space-x-reverse">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{patient.name}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(patient.dateOfBirth).toLocaleDateString('ar-SA')}
                          </p>
                        </div>
                        <div className="text-xs text-gray-500">
                          {patient.gender === 'male' ? 'ذكر' : 'أنثى'}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {selectedTab === 'tests' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">إدارة الفحوصات</h2>
              <Button>
                <Plus className="w-4 h-4 ml-2" />
                فحص جديد
              </Button>
            </div>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-500 text-center py-8">سيتم إضافة جدول الفحوصات هنا</p>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === 'patients' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">إدارة المرضى</h2>
              <Button>
                <Plus className="w-4 h-4 ml-2" />
                مريض جديد
              </Button>
            </div>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-500 text-center py-8">سيتم إضافة جدول المرضى هنا</p>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === 'reports' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">التقارير</h2>
              <Button>
                <Plus className="w-4 h-4 ml-2" />
                تقرير جديد
              </Button>
            </div>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-500 text-center py-8">سيتم إضافة قائمة التقارير هنا</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}