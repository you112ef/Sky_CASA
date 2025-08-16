using System.Windows;
using MedicalLabAnalyzer.ViewModels;

namespace MedicalLabAnalyzer.Views
{
    public partial class MainWindow : Window
    {
        public MainWindow(MainViewModel viewModel)
        {
            InitializeComponent();
            DataContext = viewModel;
            
            // Set up window events
            Loaded += MainWindow_Loaded;
            Closing += MainWindow_Closing;
        }

        private void MainWindow_Loaded(object sender, RoutedEventArgs e)
        {
            // Initialize the main window
            if (DataContext is MainViewModel viewModel)
            {
                viewModel.Initialize();
            }
        }

        private void MainWindow_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            // Handle window closing
            if (DataContext is MainViewModel viewModel)
            {
                var result = MessageBox.Show(
                    "Are you sure you want to exit the application?\n\nهل أنت متأكد من أنك تريد الخروج من التطبيق؟",
                    "Confirm Exit - تأكيد الخروج",
                    MessageBoxButton.YesNo,
                    MessageBoxImage.Question);

                if (result == MessageBoxResult.No)
                {
                    e.Cancel = true;
                    return;
                }

                // Perform cleanup
                viewModel.Cleanup();
            }
        }

        protected override void OnSourceInitialized(System.Windows.Interop.HwndSource hwndSource)
        {
            base.OnSourceInitialized(hwndSource);
            
            // Set window icon
            if (System.IO.File.Exists("Resources/app.ico"))
            {
                Icon = new System.Windows.Media.Imaging.BitmapImage(
                    new System.Uri("Resources/app.ico", System.UriKind.Relative));
            }
        }
    }
}