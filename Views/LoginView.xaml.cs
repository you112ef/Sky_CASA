using MedicalLabAnalyzer.Services;
using MedicalLabAnalyzer.ViewModels;
using Prism.Commands;
using Prism.Mvvm;
using System.Windows;

namespace MedicalLabAnalyzer.Views
{
    public partial class LoginView : Window
    {
        private readonly ISecurityService _securityService;
        private readonly IEventAggregator _eventAggregator;

        public LoginView(ISecurityService securityService, IEventAggregator eventAggregator)
        {
            InitializeComponent();
            _securityService = securityService;
            _eventAggregator = eventAggregator;
        }

        private async void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                var user = await _securityService.AuthenticateUserAsync(UsernameBox.Text, PasswordBox.Password);
                if (user != null)
                {
                    _eventAggregator.GetEvent<LoginSuccessEvent>().Publish(user);
                    Close();
                }
                else
                {
                    MessageBox.Show("Invalid credentials!", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Login failed: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}