using MedicalLabAnalyzer.App;
using System.Windows;

namespace MedicalLabAnalyzer
{
    internal class Program
    {
        [STAThread]
        static void Main()
        {
            var app = new App();
            app.InitializeComponent();
            app.Run();
        }
    }
}