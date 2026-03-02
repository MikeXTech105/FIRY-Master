using Dapper;
using FIRY_Master.Domain.Entities;
using FIRY_Master.Domain.Interfaces;
using FIRY_Master.Infrastructure.Data;

namespace FIRY_Master.Infrastructure.Repositories;

public class AuthRepository : IAuthRepository
{
    private readonly DapperContext _context;

    public AuthRepository(DapperContext context)
    {
        _context = context;
    }

    public async Task<User?> GetByUsernameAsync(string username)
    {
        const string sql = @"
SELECT u.Id, u.Username, u.PasswordHash, u.IsActive, r.Name as RoleName
FROM Users u
INNER JOIN Roles r ON r.Id = u.RoleId
WHERE u.Username = @username";

        using var connection = _context.CreateConnection();
        return await connection.QueryFirstOrDefaultAsync<User>(sql, new { username });
    }

    public async Task<IReadOnlyList<string>> GetAllowedRoutesByUserIdAsync(int userId)
    {
        const string sql = @"
SELECT DISTINCT p.Route
FROM Users u
INNER JOIN RolePagePermissions rpp ON rpp.RoleId = u.RoleId
INNER JOIN Pages p ON p.Id = rpp.PageId
WHERE u.Id = @userId";

        using var connection = _context.CreateConnection();
        var routes = await connection.QueryAsync<string>(sql, new { userId });
        return routes.ToList();
    }
}
