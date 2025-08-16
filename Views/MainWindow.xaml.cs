using MedicalLabAnalyzer.ViewModels;
using Prism.Commands;
using Prism.Mvvm;

namespace MedicalLabAnalyzer.Views
{
    public partial class MainWindow : Window
    {
        private readonly IViewModelLocator _viewModelLocator;
        private readonly IRegionManager _regionManager;

        public MainWindow(IViewModelLocator viewModelLocator, IRegionManager regionManager)
        {
            InitializeComponent();
            _viewModelLocator = viewModelLocator;
            _regionManager = regionManager;
            _regionManager.RegisterViewWithRegion("MainRegion", typeof(MainWindow));
            _regionManager.RequestNavigate("PatientView");
        }

        public ICommand NavigateToPatientCommand => new DelegateCommand(() => _regionManager.RequestNavigate("PatientView"));
        public ICommand NavigateToExamCommand => new DelegateCommand(() => _regionManager.RequestNavigate("ExamView"));
        public ICommand NavigateToVideoAnalysisCommand => new DelegateCommand(() => _regionManager.RequestNavigate("VideoAnalysisView"));
        public ICommand NavigateToReportsCommand => new DelegateCommand(() => _regionManager.RequestNavigate("ReportsView"));
    }
}