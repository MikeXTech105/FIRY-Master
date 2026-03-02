using MyApp.Domain.Entities;

namespace MyApp.Application.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);
    Task<User?> GetByIdAsync(int id);
    Task<IReadOnlyList<User>> GetAllAsync();
    Task<int> CreateAsync(User user);
    Task<bool> ExistsByEmailAsync(string email);
    Task<bool> MasterAdminExistsAsync();
}
