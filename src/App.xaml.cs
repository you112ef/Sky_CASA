using System;
using System.Windows;
using System.Windows.Threading;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Serilog;
using MedicalLabAnalyzer.Data;
using MedicalLabAnalyzer.Services;
using MedicalLabAnalyzer.ViewModels;
using MedicalLabAnalyzer.Views;

namespace MedicalLabAnalyzer
{
    public partial class App : Application
    {
        private ServiceProvider _serviceProvider;
        private ILogger<App> _logger;

        protected override void OnStartup(StartupEventArgs e)
        {
            try
            {
                // Configure Serilog
                Log.Logger = new LoggerConfiguration()
                    .MinimumLevel.Information()
                    .WriteTo.Console()
                    .WriteTo.File("logs/medicallab-.log", rollingInterval: RollingInterval.Day, retainedFileCountLimit: 30)
                    .CreateLogger();

                _logger = Log.ForContext<App>();
                _logger.LogInformation("Application starting up...");

                // Configure services
                var services = new ServiceCollection();
                ConfigureServices(services);

                _serviceProvider = services.BuildServiceProvider();

                // Initialize database
                InitializeDatabase();

                // Create and show main window
                var mainWindow = _serviceProvider.GetRequiredService<MainWindow>();
                mainWindow.Show();

                _logger.LogInformation("Application started successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to start application");
                MessageBox.Show($"Failed to start application: {ex.Message}", "Startup Error", 
                    MessageBoxButton.OK, MessageBoxImage.Error);
                Shutdown(1);
            }

            base.OnStartup(e);
        }

        protected override void OnExit(ExitEventArgs e)
        {
            try
            {
                _logger?.LogInformation("Application shutting down...");
                Log.CloseAndFlush();
            }
            catch (Exception ex)
            {
                // Log error but don't throw during shutdown
                Console.WriteLine($"Error during shutdown: {ex.Message}");
            }

            base.OnExit(e);
        }

        private void ConfigureServices(IServiceCollection services)
        {
            // Logging
            services.AddLogging(builder =>
            {
                builder.AddSerilog(dispose: true);
            });

            // Database
            services.AddDbContext<MedicalLabContext>(options =>
            {
                var dbPath = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Database", "medical_lab.db");
                options.UseSqlite($"Data Source={dbPath}");
            });

            // Services
            services.AddSingleton<IAuthenticationService, AuthenticationService>();
            services.AddSingleton<IPatientService, PatientService>();
            services.AddSingleton<IExamService, ExamService>();
            services.AddSingleton<ISampleService, SampleService>();
            services.AddSingleton<IVideoService, VideoService>();
            services.AddSingleton<IReportService, ReportService>();
            services.AddSingleton<IBackupService, BackupService>();
            services.AddSingleton<IVideoAnalysisService, VideoAnalysisService>();

            // ViewModels
            services.AddTransient<LoginViewModel>();
            services.AddTransient<MainViewModel>();
            services.AddTransient<PatientViewModel>();
            services.AddTransient<ExamViewModel>();
            services.AddTransient<VideoAnalysisViewModel>();
            services.AddTransient<ReportsViewModel>();

            // Views
            services.AddTransient<LoginView>();
            services.AddTransient<MainWindow>();
            services.AddTransient<PatientManagementView>();
            services.AddTransient<ExamManagementView>();
            services.AddTransient<VideoAnalysisView>();
            services.AddTransient<ReportsView>();
        }

        private void InitializeDatabase()
        {
            try
            {
                using var scope = _serviceProvider.CreateScope();
                var context = scope.ServiceProvider.GetRequiredService<MedicalLabContext>();
                
                // Ensure database is created
                context.Database.EnsureCreated();
                
                _logger.LogInformation("Database initialized successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to initialize database");
                throw;
            }
        }

        private void Application_DispatcherUnhandledException(object sender, DispatcherUnhandledExceptionEventArgs e)
        {
            try
            {
                _logger?.LogError(e.Exception, "Unhandled exception occurred");
                
                var result = MessageBox.Show(
                    $"An unexpected error occurred:\n\n{e.Exception.Message}\n\nWould you like to continue?",
                    "Unexpected Error",
                    MessageBoxButton.YesNo,
                    MessageBoxImage.Error);

                if (result == MessageBoxResult.No)
                {
                    Shutdown(1);
                }

                e.Handled = true;
            }
            catch (Exception ex)
            {
                // If logging fails, show basic error message
                MessageBox.Show($"Critical error: {ex.Message}", "Critical Error", 
                    MessageBoxButton.OK, MessageBoxImage.Error);
                Shutdown(1);
            }
        }

        private void Application_Startup(object sender, StartupEventArgs e)
        {
            // Set up global exception handling
            DispatcherUnhandledException += Application_DispatcherUnhandledException;
            
            // Set up unhandled exception handling for non-UI threads
            AppDomain.CurrentDomain.UnhandledException += (s, args) =>
            {
                try
                {
                    _logger?.LogError(args.ExceptionObject as Exception, "Unhandled exception in non-UI thread");
                }
                catch
                {
                    // Ignore logging errors during crash
                }
            };
        }
    }
}