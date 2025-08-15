"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Phone, Mail, MapPin, Calendar, Save, X } from "lucide-react";
import { Patient } from "@/types";

interface PatientFormProps {
  patient?: Patient;
  onSubmit: (patient: Partial<Patient>) => void;
  onCancel: () => void;
}

export default function PatientForm({ patient, onSubmit, onCancel }: PatientFormProps) {
  const [formData, setFormData] = useState({
    name: patient?.name || "",
    dateOfBirth: patient?.dateOfBirth ? new Date(patient.dateOfBirth).toISOString().split('T')[0] : "",
    gender: patient?.gender || "male",
    phone: patient?.phone || "",
    email: patient?.email || "",
    address: patient?.address || "",
    medicalHistory: patient?.medicalHistory || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      dateOfBirth: new Date(formData.dateOfBirth),
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl">
                {patient ? "تعديل بيانات المريض" : "إضافة مريض جديد"}
              </CardTitle>
              <CardDescription>
                {patient ? "تحديث معلومات المريض" : "إدخال بيانات المريض الجديد"}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  الاسم الكامل *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="أدخل الاسم الكامل"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  تاريخ الميلاد *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  الجنس *
                </label>
                <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الجنس" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">ذكر</SelectItem>
                    <SelectItem value="female">أنثى</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  رقم الهاتف *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="tel"
                    placeholder="أدخل رقم الهاتف"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="email"
                    placeholder="أدخل البريد الإلكتروني"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  العنوان
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="أدخل العنوان"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Medical History */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                التاريخ الطبي
              </label>
              <Textarea
                placeholder="أدخل التاريخ الطبي للمريض (الأمراض السابقة، الأدوية، الحساسية، إلخ)"
                value={formData.medicalHistory}
                onChange={(e) => handleChange("medicalHistory", e.target.value)}
                rows={4}
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 space-x-reverse pt-6 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>
                إلغاء
              </Button>
              <Button type="submit">
                <Save className="w-4 h-4 ml-2" />
                {patient ? "تحديث" : "حفظ"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}