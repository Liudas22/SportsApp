using SportsApp.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace SportsApp.Infrastructure.Services
{
    public class HashService : IHashService
    {
        private static readonly Encoding HashEncoding = Encoding.UTF8;
        public HashPasswordResponse HashPassword(string password)
        {
            using var hmac = new HMACSHA512();

            var response = new HashPasswordResponse(
                PasswordSalt: hmac.Key,
                PasswordHash: hmac.ComputeHash(HashEncoding.GetBytes(password))
            );

            return response;
        }
    }
}
