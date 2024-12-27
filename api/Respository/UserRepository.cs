using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class UserRepository : IUserRepository
    {
        private DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public bool CreateUser(User user)
        {
            _context.Users.Add(user);
            return Save();
        }

        public async Task<User?> GetUserByEmail(string Email, bool IsCustomer)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Email == Email && x.IsCustomer == IsCustomer);
        }

        public async Task<ICollection<User>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }

        private bool Save()
        {
            var saved = _context.SaveChanges();
            return saved >= 0 ? true : false;
        }

        public async Task<User?> GetUserByUsername(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Username == username);
        }
    }
}
