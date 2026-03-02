using FIRY_Master.Domain.Entities;

namespace FIRY_Master.Domain.Interfaces;

public interface IRbacRepository
{
    Task<int> CreateRoleAsync(string roleName);
    Task<int> CreateUserAsync(string username, string passwordHash, int roleId);
    Task<int> CreatePageAsync(string pageName, string route);
    Task SetRolePagePermissionsAsync(int roleId, IEnumerable<int> pageIds);
    Task<IReadOnlyList<RoleDto>> GetRolesAsync();
    Task<IReadOnlyList<UserDto>> GetUsersAsync();
    Task<IReadOnlyList<PageDto>> GetPagesAsync();
    Task<IReadOnlyList<int>> GetPageIdsByRoleIdAsync(int roleId);
}
