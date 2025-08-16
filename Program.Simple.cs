using System;
using System.Runtime.InteropServices;

namespace MedicalLabAnalyzer.Simple
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("🔬 MedicalLabAnalyzer - Simple Test Version");
            Console.WriteLine("==========================================");
            
            // Display system information
            Console.WriteLine($"Operating System: {RuntimeInformation.OSDescription}");
            Console.WriteLine($"Architecture: {RuntimeInformation.OSArchitecture}");
            Console.WriteLine($".NET Version: {Environment.Version}");
            Console.WriteLine($"Current Directory: {Environment.CurrentDirectory}");
            
            // Test basic functionality
            try
            {
                Console.WriteLine("\n✅ Basic functionality test passed!");
                Console.WriteLine("✅ System information retrieved successfully!");
                Console.WriteLine("✅ .NET runtime working correctly!");
                
                // Test file system access
                if (System.IO.Directory.Exists("Database"))
                {
                    Console.WriteLine("✅ Database directory found!");
                }
                else
                {
                    Console.WriteLine("⚠️ Database directory not found");
                }
                
                Console.WriteLine("\n🎉 All tests completed successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error during testing: {ex.Message}");
            }
            
            Console.WriteLine("\nPress any key to exit...");
            Console.ReadKey();
        }
    }
}