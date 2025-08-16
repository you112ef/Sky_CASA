"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ImageIcon, Upload, Eye, RotateCcw, CheckCircle, AlertCircle } from "lucide-react";
import { ImageAnalysisResult } from "@/types";
import { imageAnalysisService } from "@/services/imageAnalysisService";

interface ImageAnalysisProps {
  testId: string;
  onAnalysisComplete: (results: ImageAnalysisResult) => void;
}

export default function ImageAnalysis({ testId, onAnalysisComplete }: ImageAnalysisProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState<ImageAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFile = (file: File) => {
    // التحقق من نوع الملف
    if (!file.type.startsWith('image/')) {
      setError('يرجى اختيار ملف صورة صالح');
      return;
    }

    // التحقق من حجم الملف (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('حجم الملف يجب أن يكون أقل من 10MB');
      return;
    }

    setSelectedFile(file);
    setError(null);
    setAnalysisResults(null);

    // إنشاء معاينة للصورة
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const startAnalysis = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setError(null);

    try {
      // محاكاة تقدم التحليل
      const progressInterval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // استخدام خدمة التحليل الحقيقية
      const results = await imageAnalysisService.analyzeImage(selectedFile);
      
      clearInterval(progressInterval);
      setAnalysisProgress(100);

      setAnalysisResults(results);
      onAnalysisComplete(results);

      // إعادة تعيين التقدم بعد ثانيتين
      setTimeout(() => {
        setAnalysisProgress(0);
      }, 2000);

    } catch (err) {
      setError('فشل في تحليل الصورة. يرجى المحاولة مرة أخرى.');
      console.error('Image analysis failed:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setAnalysisResults(null);
    setAnalysisProgress(0);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ImageIcon className="w-5 h-5 ml-2" />
            تحليل الصور الطبية
          </CardTitle>
          <CardDescription>
            رفع وتحليل الصور الطبية باستخدام الذكاء الاصطناعي
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 ml-2" />
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          )}

          {!selectedFile ? (
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                رفع صورة طبية
              </h3>
              <p className="text-gray-500 mb-4">
                اسحب وأفلت الصورة هنا أو انقر لاختيار ملف
              </p>
              <p className="text-sm text-gray-400">
                يدعم: JPG, PNG, TIFF (الحد الأقصى: 10MB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Image Preview */}
              <div className="relative">
                <img
                  src={previewUrl!}
                  alt="Preview"
                  className="w-full max-h-96 object-contain rounded-lg border"
                />
                <div className="absolute top-2 right-2 flex space-x-2 space-x-reverse">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={resetAnalysis}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Analysis Controls */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  onClick={startAnalysis}
                  disabled={isAnalyzing}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isAnalyzing ? 'جاري التحليل...' : 'بدء التحليل'}
                </Button>
              </div>

              {/* Analysis Progress */}
              {isAnalyzing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>تقدم التحليل</span>
                    <span>{analysisProgress}%</span>
                  </div>
                  <Progress value={analysisProgress} className="w-full" />
                </div>
              )}

              {/* Analysis Results */}
              {analysisResults && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="w-5 h-5 text-green-600 ml-2" />
                    <h3 className="text-lg font-medium text-green-800">تم التحليل بنجاح</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">معلومات الصورة</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>العرض: {analysisResults.results.imageMetrics?.width}px</p>
                        <p>الارتفاع: {analysisResults.results.imageMetrics?.height}px</p>
                        <p>نسبة الأبعاد: {analysisResults.results.imageMetrics?.aspectRatio}</p>
                        <p>حجم الملف: {analysisResults.results.imageMetrics?.fileSize}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">نتائج التحليل</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>عدد الخلايا: {analysisResults.results.cellCount}</p>
                        <p>الخلايا غير الطبيعية: {analysisResults.results.abnormalCells}</p>
                        <p>كثافة الخلايا: {analysisResults.results.cellDensity}%</p>
                        <p>مستوى الثقة: {(analysisResults.confidence * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-white rounded border">
                    <h4 className="font-medium text-gray-900 mb-2">ملاحظات التحليل</h4>
                    <p className="text-sm text-gray-700">{analysisResults.notes}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}