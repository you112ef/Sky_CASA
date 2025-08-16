using System;
using System.Security.Cryptography;
using System.Text;
using System.Collections.Generic; // Added for List
using System.Linq; // Added for Any

namespace MedicalLabAnalyzer.Common
{
    public static class SecurityHelper
    {
        private const int SaltSize = 16;
        private const int HashSize = 32;
        private const int Iterations = 150_000;

        /// <summary>
        /// Creates a password hash and salt using PBKDF2
        /// </summary>
        /// <param name="password">Plain text password</param>
        /// <param name="hash">Output hash</param>
        /// <param name="salt">Output salt</param>
        public static void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
        {
            if (string.IsNullOrEmpty(password))
                throw new ArgumentException("Password cannot be null or empty", nameof(password));

            using var rng = RandomNumberGenerator.Create();
            salt = new byte[SaltSize];
            rng.GetBytes(salt);

            using var derive = new Rfc2898DeriveBytes(
                password, 
                salt, 
                Iterations, 
                HashAlgorithmName.SHA256);
            
            hash = derive.GetBytes(HashSize);
        }

        /// <summary>
        /// Verifies a password against stored hash and salt
        /// </summary>
        /// <param name="password">Plain text password to verify</param>
        /// <param name="storedHash">Stored password hash</param>
        /// <param name="storedSalt">Stored password salt</param>
        /// <returns>True if password matches, false otherwise</returns>
        public static bool VerifyPassword(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (string.IsNullOrEmpty(password))
                return false;

            if (storedHash == null || storedHash.Length != HashSize)
                return false;

            if (storedSalt == null || storedSalt.Length != SaltSize)
                return false;

            using var derive = new Rfc2898DeriveBytes(
                password, 
                storedSalt, 
                Iterations, 
                HashAlgorithmName.SHA256);
            
            var testHash = derive.GetBytes(HashSize);
            
            return CryptographicOperations.FixedTimeEquals(testHash, storedHash);
        }

        /// <summary>
        /// Generates a random password of specified length
        /// </summary>
        /// <param name="length">Password length</param>
        /// <param name="includeSpecialChars">Whether to include special characters</param>
        /// <returns>Random password</returns>
        public static string GenerateRandomPassword(int length = 12, bool includeSpecialChars = true)
        {
            const string lowercase = "abcdefghijklmnopqrstuvwxyz";
            const string uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const string digits = "0123456789";
            const string special = "!@#$%^&*()_+-=[]{}|;:,.<>?";

            var chars = lowercase + uppercase + digits;
            if (includeSpecialChars)
                chars += special;

            var random = new byte[length];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(random);

            var result = new StringBuilder(length);
            for (int i = 0; i < length; i++)
            {
                result.Append(chars[random[i] % chars.Length]);
            }

            return result.ToString();
        }

        /// <summary>
        /// Validates password strength
        /// </summary>
        /// <param name="password">Password to validate</param>
        /// <returns>Password strength result</returns>
        public static PasswordStrengthResult ValidatePasswordStrength(string password)
        {
            if (string.IsNullOrEmpty(password))
                return new PasswordStrengthResult { IsValid = false, Score = 0, Message = "Password cannot be empty" };

            var score = 0;
            var messages = new List<string>();

            // Length check
            if (password.Length >= 8) score += 1;
            else messages.Add("Password must be at least 8 characters long");

            if (password.Length >= 12) score += 1;
            if (password.Length >= 16) score += 1;

            // Character variety checks
            if (password.Any(char.IsLower)) score += 1;
            else messages.Add("Password must contain lowercase letters");

            if (password.Any(char.IsUpper)) score += 1;
            else messages.Add("Password must contain uppercase letters");

            if (password.Any(char.IsDigit)) score += 1;
            else messages.Add("Password must contain numbers");

            if (password.Any(c => !char.IsLetterOrDigit(c))) score += 1;
            else messages.Add("Password should contain special characters");

            // Complexity checks
            if (password.Length >= 8 && 
                password.Any(char.IsLower) && 
                password.Any(char.IsUpper) && 
                password.Any(char.IsDigit))
            {
                score += 1;
            }

            var strength = score switch
            {
                0 or 1 => "Very Weak",
                2 => "Weak",
                3 => "Fair",
                4 => "Good",
                5 => "Strong",
                _ => "Very Strong"
            };

            var isValid = score >= 3;

            return new PasswordStrengthResult
            {
                IsValid = isValid,
                Score = score,
                Strength = strength,
                Message = isValid ? $"Password strength: {strength}" : string.Join("; ", messages)
            };
        }

        /// <summary>
        /// Generates a secure random token
        /// </summary>
        /// <param name="length">Token length in bytes</param>
        /// <returns>Base64 encoded token</returns>
        public static string GenerateSecureToken(int length = 32)
        {
            var token = new byte[length];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(token);
            return Convert.ToBase64String(token);
        }
    }

    public class PasswordStrengthResult
    {
        public bool IsValid { get; set; }
        public int Score { get; set; }
        public string Strength { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}