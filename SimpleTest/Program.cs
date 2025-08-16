using System;
using System.IO;
using System.Threading.Tasks;

namespace MedicalLabAnalyzer.Simple
{
    class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("🔬 MedicalLabAnalyzer - Simple Version");
            Console.WriteLine("=====================================");
            
            try
            {
                Console.WriteLine("\n✅ تم تحميل النظام بنجاح!");
                
                // التحقق من وجود مجلد قاعدة البيانات
                if (Directory.Exists("Database"))
                {
                    Console.WriteLine("✅ تم العثور على مجلد قاعدة البيانات!");
                    var dbFiles = Directory.GetFiles("Database", "*.*", SearchOption.AllDirectories);
                    Console.WriteLine($"   تم العثور على {dbFiles.Length} ملف قاعدة بيانات");
                }
                else
                {
                    Console.WriteLine("⚠️ مجلد قاعدة البيانات غير موجود - سيتم إنشاؤه تلقائياً");
                    Directory.CreateDirectory("Database");
                }
                
                // بدء التطبيق البسيط
                await RunSimpleApplication();
                
                Console.WriteLine("\n🎉 تم تشغيل التطبيق بنجاح!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ خطأ أثناء التشغيل: {ex.Message}");
            }
            
            Console.WriteLine("\nاضغط أي مفتاح للخروج...");
            Console.ReadKey();
        }

        private static async Task RunSimpleApplication()
        {
            Console.WriteLine("\n💻 تشغيل التطبيق البسيط...");
            
            try
            {
                // عرض قائمة الخيارات البسيطة
                await ShowSimpleMenu();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ فشل في تشغيل التطبيق: {ex.Message}");
                throw;
            }
        }

        private static async Task ShowSimpleMenu()
        {
            bool exit = false;
            
            while (!exit)
            {
                Console.WriteLine("\n" + new string('=', 40));
                Console.WriteLine("🏥 Medical Lab Analyzer - النسخة البسيطة");
                Console.WriteLine(new string('=', 40));
                Console.WriteLine("1. عرض معلومات النظام");
                Console.WriteLine("2. إدارة قاعدة البيانات");
                Console.WriteLine("3. اختبار الوظائف الأساسية");
                Console.WriteLine("4. إعدادات بسيطة");
                Console.WriteLine("0. خروج");
                Console.WriteLine(new string('=', 40));
                
                Console.Write("اختر رقم الخيار: ");
                var choice = Console.ReadLine();
                
                switch (choice)
                {
                    case "1":
                        await ShowSystemInfo();
                        break;
                    case "2":
                        await ManageDatabase();
                        break;
                    case "3":
                        await TestBasicFunctions();
                        break;
                    case "4":
                        await ShowSimpleSettings();
                        break;
                    case "0":
                        exit = true;
                        Console.WriteLine("👋 شكراً لاستخدام النسخة البسيطة!");
                        break;
                    default:
                        Console.WriteLine("❌ خيار غير صحيح. يرجى المحاولة مرة أخرى.");
                        break;
                }
                
                if (!exit)
                {
                    Console.WriteLine("\nاضغط Enter للعودة للقائمة الرئيسية...");
                    Console.ReadLine();
                }
            }
        }

        private static async Task ShowSystemInfo()
        {
            Console.WriteLine("\n💻 معلومات النظام:");
            Console.WriteLine($"   نظام التشغيل: {Environment.OSVersion}");
            Console.WriteLine($"   إصدار .NET: {Environment.Version}");
            Console.WriteLine($"   المجلد الحالي: {Environment.CurrentDirectory}");
            Console.WriteLine($"   ذاكرة النظام: {GC.GetTotalMemory(false) / 1024 / 1024} MB");
            Console.WriteLine($"   عدد المعالجات: {Environment.ProcessorCount}");
            
            await Task.CompletedTask;
        }

        private static async Task ManageDatabase()
        {
            Console.WriteLine("\n🗄️ إدارة قاعدة البيانات:");
            
            if (Directory.Exists("Database"))
            {
                var dbFiles = Directory.GetFiles("Database", "*.*", SearchOption.AllDirectories);
                Console.WriteLine($"   عدد الملفات: {dbFiles.Length}");
                
                if (dbFiles.Length > 0)
                {
                    Console.WriteLine("   الملفات الموجودة:");
                    foreach (var file in dbFiles)
                    {
                        var fileInfo = new FileInfo(file);
                        Console.WriteLine($"     - {Path.GetFileName(file)} ({fileInfo.Length} bytes)");
                    }
                }
                else
                {
                    Console.WriteLine("   لا توجد ملفات في قاعدة البيانات");
                }
            }
            else
            {
                Console.WriteLine("   مجلد قاعدة البيانات غير موجود");
            }
            
            await Task.CompletedTask;
        }

        private static async Task TestBasicFunctions()
        {
            Console.WriteLine("\n🧪 اختبار الوظائف الأساسية:");
            
            try
            {
                // اختبار إنشاء ملف
                var testFile = Path.Combine("Database", "test.txt");
                await File.WriteAllTextAsync(testFile, "اختبار الوظائف الأساسية - " + DateTime.Now);
                Console.WriteLine("✅ تم إنشاء ملف اختبار بنجاح");
                
                // اختبار قراءة الملف
                var content = await File.ReadAllTextAsync(testFile);
                Console.WriteLine("✅ تم قراءة الملف بنجاح");
                
                // اختبار حذف الملف
                File.Delete(testFile);
                Console.WriteLine("✅ تم حذف ملف الاختبار بنجاح");
                
                Console.WriteLine("🎉 جميع الاختبارات نجحت!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ فشل في الاختبار: {ex.Message}");
            }
        }

        private static async Task ShowSimpleSettings()
        {
            Console.WriteLine("\n⚙️ الإعدادات البسيطة:");
            Console.WriteLine("1. تغيير مجلد قاعدة البيانات");
            Console.WriteLine("2. إعدادات التسجيل");
            Console.WriteLine("3. إعدادات الأمان");
            Console.WriteLine("4. إعدادات النسخ الاحتياطي");
            
            await Task.CompletedTask;
        }
    }
}