namespace FIRY_Master.Domain.Interfaces;

public interface IRbacRepository
{
    Task<int> CreateRoleAsync(string roleName);
    Task<int> CreateUserAsync(string username, string passwordHash, int roleId);
    Task<int> CreatePageAsync(string pageName, string route);
    Task SetRolePagePermissionsAsync(int roleId, IEnumerable<int> pageIds);
    Task<IReadOnlyList<object>> GetRolesAsync();
    Task<IReadOnlyList<object>> GetUsersAsync();
    Task<IReadOnlyList<object>> GetPagesAsync();
}
