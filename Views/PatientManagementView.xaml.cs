using MedicalLabAnalyzer.Models;
using MedicalLabAnalyzer.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.ObjectModel;
using System.Windows;

namespace MedicalLabAnalyzer.Views
{
    public partial class PatientManagementView : Window
    {
        private readonly IMedicalLabContext _context;
        public ObservableCollection<PatientModel> Patients { get; set; }

        public PatientManagementView(IMedicalLabContext context)
        {
            InitializeComponent();
            _context = context;
            LoadPatients();
        }

        private void LoadPatients()
        {
            Patients = new ObservableCollection<PatientModel>(_context.Patients.ToList());
        }

        private void AddPatient_Click(object sender, RoutedEventArgs e)
        {
            var addWindow = new AddPatientWindow();
            if (addWindow.ShowDialog() == true)
            {
                _context.Patients.Add(addWindow.NewPatient);
                _context.SaveChanges();
                LoadPatients();
            }
        }

        private void EditPatient_Click(object sender, RoutedEventArgs e)
        {
            if (PatientsGrid.SelectedItem is PatientModel selectedPatient)
            {
                var editWindow = new EditPatientWindow(selectedPatient);
                if (editWindow.ShowDialog() == true)
                {
                    _context.SaveChanges();
                    LoadPatients();
                }
            }
        }

        private void DeletePatient_Click(object sender, RoutedEventArgs e)
        {
            if (PatientsGrid.SelectedItem is PatientModel selectedPatient)
            {
                _context.Patients.Remove(selectedPatient);
                _context.SaveChanges();
                LoadPatients();
            }
        }
    }
}