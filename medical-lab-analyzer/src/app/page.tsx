"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Lock, Eye, EyeOff, Activity, Users, FileText, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log("Login attempt:", { username, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Login Form */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Activity className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                نظام التحليل الطبي المختبري
              </CardTitle>
              <CardDescription className="text-gray-600">
                تسجيل الدخول للوصول إلى النظام
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium text-gray-700">
                    اسم المستخدم
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="أدخل اسم المستخدم"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="أدخل كلمة المرور"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  تسجيل الدخول
                </Button>
                
                {/* Demo Link */}
                <div className="text-center pt-4">
                  <Link href="/dashboard">
                    <Button type="button" variant="outline" className="w-full">
                      عرض النسخة التجريبية
                      <ArrowRight className="w-4 h-4 mr-2" />
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Features */}
        <div className="flex items-center justify-center">
          <div className="space-y-6">
            <div className="text-center lg:text-right">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                نظام متكامل للتحليل الطبي
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                إدارة شاملة للفحوصات الطبية وتحليل الصور وتوليد التقارير
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">إدارة المرضى</h3>
                    <p className="text-sm text-gray-600">تسجيل وإدارة بيانات المرضى</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">تحليل الصور</h3>
                    <p className="text-sm text-gray-600">معالجة وتحليل الصور الطبية</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">النتائج والتحليلات</h3>
                    <p className="text-sm text-gray-600">عرض وتفسير النتائج</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">التقارير</h3>
                    <p className="text-sm text-gray-600">توليد تقارير طبية احترافية</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
