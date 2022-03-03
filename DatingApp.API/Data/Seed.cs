using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public class Seed
    {
        public static void SeedUsers(DataContext context)
        {
            if (!context.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonSerializer.Deserialize<List<User>>(userData);

                foreach (var user in users)
                {
                    byte[] passwordHash, passwordSalt;
                    CreatePasswordHash("password", out passwordHash, out passwordSalt);

                    user.PasswordHash = passwordHash;
                    user.PasswordSalt = passwordSalt;
                    user.Username = user.Username.ToLower();

                    context.Users.Add(user);
                }

                context.SaveChanges();
            }

            if (!context.Values.Any())
            {
                var value1 = new Value
                {
                    Name = "test value"
                };
                var value2 = new Value
                {
                    Name = "another test value"
                };

                context.Values.Add(value1);
                context.Values.Add(value2);

                context.SaveChanges();
            }
        }
        
        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}

// Server=tcp:hrshuvo-dating-app.database.windows.net,1433;Initial Catalog=datingapp-db;Persist Security Info=False;User ID=datingapp-admin;Password=shuvo1234#;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;