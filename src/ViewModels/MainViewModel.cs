using System;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using MedicalLabAnalyzer.Data.Entities;
using MedicalLabAnalyzer.Services;
using MedicalLabAnalyzer.Views;

namespace MedicalLabAnalyzer.ViewModels
{
    public class MainViewModel : INotifyPropertyChanged
    {
        private readonly IAuthenticationService _authService;
        private readonly INavigationService _navigationService;
        private readonly ILogger _logger;

        private User _currentUser;
        private object _currentPage;
        private string _currentPageTitle;
        private bool _isLoading;

        public MainViewModel(
            IAuthenticationService authService,
            INavigationService navigationService,
            ILogger logger)
        {
            _authService = authService ?? throw new ArgumentNullException(nameof(authService));
            _navigationService = navigationService ?? throw new ArgumentNullException(nameof(navigationService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));

            // Initialize commands
            NavigateCommand = new RelayCommand<string>(Navigate);
            LogoutCommand = new RelayCommand(Logout);
            ShowNotificationsCommand = new RelayCommand(ShowNotifications);
            ShowHelpCommand = new RelayCommand(ShowHelp);
            ShowAboutCommand = new RelayCommand(ShowAbout);

            // Initialize collections
            Notifications = new ObservableCollection<NotificationItem>();
            
            // Set default page
            CurrentPageTitle = "Dashboard - لوحة التحكم";
        }

        #region Properties

        public User CurrentUser
        {
            get => _currentUser;
            set => SetProperty(ref _currentUser, value);
        }

        public object CurrentPage
        {
            get => _currentPage;
            set => SetProperty(ref _currentPage, value);
        }

        public string CurrentPageTitle
        {
            get => _currentPageTitle;
            set => SetProperty(ref _currentPageTitle, value);
        }

        public bool IsLoading
        {
            get => _isLoading;
            set => SetProperty(ref _isLoading, value);
        }

        public ObservableCollection<NotificationItem> Notifications { get; }

        #endregion

        #region Commands

        public ICommand NavigateCommand { get; }
        public ICommand LogoutCommand { get; }
        public ICommand ShowNotificationsCommand { get; }
        public ICommand ShowHelpCommand { get; }
        public ICommand ShowAboutCommand { get; }

        #endregion

        #region Public Methods

        public async Task Initialize()
        {
            try
            {
                IsLoading = true;
                _logger.LogInformation("Initializing main view model...");

                // Get current user from authentication service
                CurrentUser = await _authService.GetCurrentUserAsync();
                if (CurrentUser == null)
                {
                    _logger.LogWarning("No current user found, redirecting to login");
                    await Logout();
                    return;
                }

                // Load notifications
                await LoadNotificationsAsync();

                // Navigate to dashboard by default
                await NavigateAsync("Dashboard");

                _logger.LogInformation("Main view model initialized successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to initialize main view model");
                MessageBox.Show($"Failed to initialize application: {ex.Message}", "Initialization Error",
                    MessageBoxButton.OK, MessageBoxImage.Error);
            }
            finally
            {
                IsLoading = false;
            }
        }

        public void Cleanup()
        {
            try
            {
                _logger.LogInformation("Cleaning up main view model...");
                
                // Save any pending changes
                // Close any open connections
                // Dispose of resources
                
                _logger.LogInformation("Main view model cleanup completed");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during cleanup");
            }
        }

        #endregion

        #region Private Methods

        private async Task NavigateAsync(string destination)
        {
            try
            {
                IsLoading = true;
                _logger.LogInformation($"Navigating to: {destination}");

                switch (destination.ToLower())
                {
                    case "dashboard":
                        CurrentPage = new DashboardView();
                        CurrentPageTitle = "Dashboard - لوحة التحكم";
                        break;

                    case "patients":
                        var patientViewModel = App.Current.Services.GetService<PatientViewModel>();
                        CurrentPage = new PatientManagementView { DataContext = patientViewModel };
                        CurrentPageTitle = "Patient Management - إدارة المرضى";
                        break;

                    case "exams":
                        var examViewModel = App.Current.Services.GetService<ExamViewModel>();
                        CurrentPage = new ExamManagementView { DataContext = examViewModel };
                        CurrentPageTitle = "Exam Management - إدارة الفحوصات";
                        break;

                    case "videoanalysis":
                        var videoViewModel = App.Current.Services.GetService<VideoAnalysisViewModel>();
                        CurrentPage = new VideoAnalysisView { DataContext = videoViewModel };
                        CurrentPageTitle = "Video Analysis - تحليل الفيديو";
                        break;

                    case "reports":
                        var reportViewModel = App.Current.Services.GetService<ReportsViewModel>();
                        CurrentPage = new ReportsView { DataContext = reportViewModel };
                        CurrentPageTitle = "Reports - التقارير";
                        break;

                    case "settings":
                        CurrentPage = new SettingsView();
                        CurrentPageTitle = "Settings - الإعدادات";
                        break;

                    case "backup":
                        CurrentPage = new BackupView();
                        CurrentPageTitle = "Backup & Restore - النسخ الاحتياطي والاسترجاع";
                        break;

                    default:
                        _logger.LogWarning($"Unknown navigation destination: {destination}");
                        break;
                }

                _logger.LogInformation($"Navigation to {destination} completed");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to navigate to {destination}");
                MessageBox.Show($"Failed to navigate to {destination}: {ex.Message}", "Navigation Error",
                    MessageBoxButton.OK, MessageBoxImage.Error);
            }
            finally
            {
                IsLoading = false;
            }
        }

        private void Navigate(string destination)
        {
            _ = NavigateAsync(destination);
        }

        private async Task Logout()
        {
            try
            {
                var result = MessageBox.Show(
                    "Are you sure you want to logout?\n\nهل أنت متأكد من أنك تريد تسجيل الخروج؟",
                    "Confirm Logout - تأكيد تسجيل الخروج",
                    MessageBoxButton.YesNo,
                    MessageBoxImage.Question);

                if (result == MessageBoxResult.Yes)
                {
                    await _authService.LogoutAsync();
                    
                    // Show login window
                    var loginWindow = new LoginView();
                    loginWindow.Show();
                    
                    // Close main window
                    Application.Current.MainWindow?.Close();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to logout");
                MessageBox.Show($"Failed to logout: {ex.Message}", "Logout Error",
                    MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private async Task LoadNotificationsAsync()
        {
            try
            {
                // Clear existing notifications
                Notifications.Clear();

                // Load notifications from service
                var notifications = await _navigationService.GetNotificationsAsync(CurrentUser?.UserId ?? 0);
                
                foreach (var notification in notifications)
                {
                    Notifications.Add(notification);
                }

                _logger.LogInformation($"Loaded {Notifications.Count} notifications");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to load notifications");
            }
        }

        private void ShowNotifications()
        {
            try
            {
                var notificationWindow = new NotificationsWindow(Notifications);
                notificationWindow.ShowDialog();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to show notifications");
                MessageBox.Show($"Failed to show notifications: {ex.Message}", "Error",
                    MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void ShowHelp()
        {
            try
            {
                var helpWindow = new HelpWindow();
                helpWindow.ShowDialog();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to show help");
                MessageBox.Show($"Failed to show help: {ex.Message}", "Error",
                    MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void ShowAbout()
        {
            try
            {
                var aboutWindow = new AboutWindow();
                aboutWindow.ShowDialog();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to show about");
                MessageBox.Show($"Failed to show about: {ex.Message}", "Error",
                    MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        #endregion

        #region INotifyPropertyChanged

        public event PropertyChangedEventHandler PropertyChanged;

        protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }

        protected bool SetProperty<T>(ref T field, T value, [CallerMemberName] string propertyName = null)
        {
            if (Equals(field, value)) return false;
            field = value;
            OnPropertyChanged(propertyName);
            return true;
        }

        #endregion
    }

    public class NotificationItem
    {
        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; }
        public string Type { get; set; } = string.Empty; // Info, Warning, Error
        public bool IsRead { get; set; }
    }

    public class RelayCommand : ICommand
    {
        private readonly Action _execute;
        private readonly Func<bool> _canExecute;

        public RelayCommand(Action execute, Func<bool> canExecute = null)
        {
            _execute = execute ?? throw new ArgumentNullException(nameof(execute));
            _canExecute = canExecute;
        }

        public event EventHandler CanExecuteChanged
        {
            add { CommandManager.RequerySuggested += value; }
            remove { CommandManager.RequerySuggested -= value; }
        }

        public bool CanExecute(object parameter) => _canExecute?.Invoke() ?? true;

        public void Execute(object parameter) => _execute();
    }

    public class RelayCommand<T> : ICommand
    {
        private readonly Action<T> _execute;
        private readonly Func<T, bool> _canExecute;

        public RelayCommand(Action<T> execute, Func<T, bool> canExecute = null)
        {
            _execute = execute ?? throw new ArgumentNullException(nameof(execute));
            _canExecute = canExecute;
        }

        public event EventHandler CanExecuteChanged
        {
            add { CommandManager.RequerySuggested += value; }
            remove { CommandManager.RequerySuggested -= value; }
        }

        public bool CanExecute(object parameter) => _canExecute?.Invoke((T)parameter) ?? true;

        public void Execute(object parameter) => _execute((T)parameter);
    }
}