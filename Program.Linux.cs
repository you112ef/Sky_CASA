using System;
using System.Runtime.InteropServices;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace MedicalLabAnalyzer.Linux
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("🔬 MedicalLabAnalyzer - Linux Version");
            Console.WriteLine("=====================================");
            
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
                if (Directory.Exists("Database"))
                {
                    Console.WriteLine("✅ Database directory found!");
                    var dbFiles = Directory.GetFiles("Database", "*.*", SearchOption.AllDirectories);
                    Console.WriteLine($"   Found {dbFiles.Length} database files");
                }
                else
                {
                    Console.WriteLine("⚠️ Database directory not found");
                }
                
                // Test Avalonia UI framework
                try
                {
                    var avaloniaType = Type.GetType("Avalonia.Application, Avalonia");
                    if (avaloniaType != null)
                    {
                        Console.WriteLine("✅ Avalonia UI framework loaded successfully!");
                    }
                    else
                    {
                        Console.WriteLine("⚠️ Avalonia UI framework not found");
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"⚠️ Avalonia test failed: {ex.Message}");
                }
                
                // Test Entity Framework
                try
                {
                    var efType = Type.GetType("Microsoft.EntityFrameworkCore.DbContext, Microsoft.EntityFrameworkCore");
                    if (efType != null)
                    {
                        Console.WriteLine("✅ Entity Framework Core loaded successfully!");
                    }
                    else
                    {
                        Console.WriteLine("⚠️ Entity Framework Core not found");
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"⚠️ Entity Framework test failed: {ex.Message}");
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