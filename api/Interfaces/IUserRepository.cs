using api.Models;

namespace api.Interfaces
{
    public interface IUserRepository
    {
        public Task<ICollection<User>> GetUsers(); // return all users
        bool CreateUser(User user); // create a new user
        Task<User?> GetUserByEmail(String Email, Boolean IsCustomer); // return user by email
        Task<User?> GetUserByUsername(string username); // return user by username
    }
}