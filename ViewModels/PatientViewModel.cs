using MedicalLabAnalyzer.Models;
using Prism.Commands;
using Prism.Mvvm;
using System.Collections.ObjectModel;
using System.Windows.Input;

namespace MedicalLabAnalyzer.ViewModels
{
    public class PatientViewModel : BindableBase
    {
        private ObservableCollection<PatientModel> _patients;
        private PatientModel _selectedPatient;

        public PatientViewModel()
        {
            LoadPatientsCommand = new DelegateCommand(LoadPatients);
            AddPatientCommand = new DelegateCommand(AddPatient);
            EditPatientCommand = new DelegateCommand(EditPatient, CanEditPatient);
            DeletePatientCommand = new DelegateCommand(DeletePatient, CanDeletePatient);
        }

        public ObservableCollection<PatientModel> Patients
        {
            get => _patients;
            set => SetProperty(ref _patients, value);
        }

        public PatientModel SelectedPatient
        {
            get => _selectedPatient;
            set
            {
                SetProperty(ref _selectedPatient, value);
                EditPatientCommand.RaiseCanExecuteChanged();
                DeletePatientCommand.RaiseCanExecuteChanged();
            }
        }

        public ICommand LoadPatientsCommand { get; }
        public ICommand AddPatientCommand { get; }
        public ICommand EditPatientCommand { get; }
        public ICommand DeletePatientCommand { get; }

        private void LoadPatients()
        {
            // Implementation for loading patients
        }

        private void AddPatient()
        {
            // Implementation for adding patient
        }

        private void EditPatient()
        {
            // Implementation for editing patient
        }

        private bool CanEditPatient()
        {
            return SelectedPatient != null;
        }

        private void DeletePatient()
        {
            // Implementation for deleting patient
        }

        private bool CanDeletePatient()
        {
            return SelectedPatient != null;
        }
    }
}