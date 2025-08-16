using MedicalLabAnalyzer.Models;
using System.Threading.Tasks;

namespace MedicalLabAnalyzer.Services
{
    public interface ISecurityService
    {
        Task<UserModel> AuthenticateUserAsync(string username, string password);
        Task<bool> ValidatePasswordAsync(string password, byte[] storedHash, byte[] storedSalt);
        Task<byte[]> HashPasswordAsync(string password);
    }
}