using Dapper;
using FIRY_Master.Domain.Interfaces;
using FIRY_Master.Infrastructure.Data;

namespace FIRY_Master.Infrastructure.Repositories;

public class RbacRepository : IRbacRepository
{
    private readonly DapperContext _context;

    public RbacRepository(DapperContext context)
    {
        _context = context;
    }

    public async Task<int> CreateRoleAsync(string roleName)
    {
        const string sql = "INSERT INTO Roles(Name) VALUES(@roleName); SELECT CAST(SCOPE_IDENTITY() as int);";
        using var connection = _context.CreateConnection();
        return await connection.ExecuteScalarAsync<int>(sql, new { roleName });
    }

    public async Task<int> CreateUserAsync(string username, string passwordHash, int roleId)
    {
        const string sql = @"INSERT INTO Users(Username, PasswordHash, RoleId, IsActive) VALUES(@username, @passwordHash, @roleId, 1);
SELECT CAST(SCOPE_IDENTITY() as int);";
        using var connection = _context.CreateConnection();
        return await connection.ExecuteScalarAsync<int>(sql, new { username, passwordHash, roleId });
    }

    public async Task<int> CreatePageAsync(string pageName, string route)
    {
        const string sql = "INSERT INTO Pages(Name, Route) VALUES(@pageName, @route); SELECT CAST(SCOPE_IDENTITY() as int);";
        using var connection = _context.CreateConnection();
        return await connection.ExecuteScalarAsync<int>(sql, new { pageName, route });
    }

    public async Task SetRolePagePermissionsAsync(int roleId, IEnumerable<int> pageIds)
    {
        using var connection = _context.CreateConnection();
        await connection.ExecuteAsync("DELETE FROM RolePagePermissions WHERE RoleId = @roleId", new { roleId });
        foreach (var pageId in pageIds.Distinct())
        {
            await connection.ExecuteAsync("INSERT INTO RolePagePermissions(RoleId, PageId) VALUES(@roleId, @pageId)", new { roleId, pageId });
        }
    }

    public async Task<IReadOnlyList<object>> GetRolesAsync()
    {
        using var connection = _context.CreateConnection();
        var rows = await connection.QueryAsync("SELECT Id, Name FROM Roles ORDER BY Id");
        return rows.Cast<object>().ToList();
    }

    public async Task<IReadOnlyList<object>> GetUsersAsync()
    {
        const string sql = @"SELECT u.Id, u.Username, u.IsActive, r.Name AS Role
FROM Users u INNER JOIN Roles r ON r.Id = u.RoleId ORDER BY u.Id";
        using var connection = _context.CreateConnection();
        var rows = await connection.QueryAsync(sql);
        return rows.Cast<object>().ToList();
    }

    public async Task<IReadOnlyList<object>> GetPagesAsync()
    {
        using var connection = _context.CreateConnection();
        var rows = await connection.QueryAsync("SELECT Id, Name, Route FROM Pages ORDER BY Id");
        return rows.Cast<object>().ToList();
    }
}
