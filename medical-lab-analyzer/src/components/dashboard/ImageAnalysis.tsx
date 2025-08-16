"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Image as ImageIcon, 
  Activity, 
  Eye, 
  Download, 
  RotateCcw,
  CheckCircle,
  AlertCircle,
  BarChart3
} from "lucide-react";
import { ImageAnalysisResult } from "@/types";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setAnalysisResults(null);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setAnalysisResults(null);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const simulateAnalysis = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate analysis progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setAnalysisProgress(i);
    }

    // Simulate analysis results
    const mockResults: ImageAnalysisResult = {
      id: `analysis_${Date.now()}`,
      imageId: `img_${Date.now()}`,
      analysisType: 'cell_count',
      results: {
        totalCells: Math.floor(Math.random() * 1000) + 500,
        redBloodCells: Math.floor(Math.random() * 500) + 200,
        whiteBloodCells: Math.floor(Math.random() * 100) + 50,
        platelets: Math.floor(Math.random() * 300) + 150,
        abnormalCells: Math.floor(Math.random() * 10),
        cellDensity: (Math.random() * 0.8 + 0.2).toFixed(2),
        colorAnalysis: {
          dominantColor: '#ff0000',
          colorDistribution: {
            red: Math.floor(Math.random() * 100),
            green: Math.floor(Math.random() * 100),
            blue: Math.floor(Math.random() * 100)
          }
        }
      },
      confidence: Number((Math.random() * 0.3 + 0.7).toFixed(2)),
      processedAt: new Date(),
      notes: 'تم تحليل الصورة بنجاح. تم اكتشاف خلايا طبيعية مع وجود بعض الخلايا غير الطبيعية.'
    };

    setAnalysisResults(mockResults);
    setIsAnalyzing(false);
    onAnalysisComplete(mockResults);
  };

  const resetAnalysis = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setAnalysisResults(null);
    setAnalysisProgress(0);
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
                  onClick={simulateAnalysis}
                  disabled={isAnalyzing}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Activity className="w-4 h-4 ml-2" />
                  {isAnalyzing ? "جاري التحليل..." : "بدء التحليل"}
                </Button>
              </div>

              {/* Analysis Progress */}
              {isAnalyzing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>تقدم التحليل</span>
                    <span>{analysisProgress}%</span>
                  </div>
                  <Progress value={analysisProgress} className="w-full" />
                </div>
              )}

              {/* Analysis Results */}
              {analysisResults && (
                <Card className="bg-green-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-800">
                      <CheckCircle className="w-5 h-5 ml-2" />
                      نتائج التحليل
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium">إجمالي الخلايا:</span>
                          <span className="text-blue-600 font-bold">
                            {analysisResults.results.totalCells}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">خلايا الدم الحمراء:</span>
                          <span>{analysisResults.results.redBloodCells}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">خلايا الدم البيضاء:</span>
                          <span>{analysisResults.results.whiteBloodCells}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">الصفائح الدموية:</span>
                          <span>{analysisResults.results.platelets}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">الخلايا غير الطبيعية:</span>
                          <span className="text-red-600 font-bold">
                            {analysisResults.results.abnormalCells}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium">كثافة الخلايا:</span>
                          <span>{analysisResults.results.cellDensity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">مستوى الثقة:</span>
                          <span className="text-green-600 font-bold">
                            {(parseFloat(analysisResults.confidence.toString()) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="pt-2">
                          <Button size="sm" variant="outline" className="w-full">
                            <BarChart3 className="w-4 h-4 ml-2" />
                            عرض التفاصيل
                          </Button>
                        </div>
                        <div>
                          <Button size="sm" variant="outline" className="w-full">
                            <Download className="w-4 h-4 ml-2" />
                            تصدير النتائج
                          </Button>
                        </div>
                      </div>
                    </div>
                    {analysisResults.notes && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">{analysisResults.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}