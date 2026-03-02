using FIRY_Master.Domain.Entities;

namespace FIRY_Master.Domain.Interfaces;

public interface IAuthRepository
{
    Task<User?> GetByUsernameAsync(string username);
    Task<IReadOnlyList<string>> GetAllowedRoutesByUserIdAsync(int userId);
}
