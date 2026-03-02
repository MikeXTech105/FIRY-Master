using Dapper;
using MyApp.Application.Interfaces;
using MyApp.Domain.Entities;
using MyApp.Infrastructure.Data;

namespace MyApp.Infrastructure.Repositories;

public class UserRepository(DapperContext context) : IUserRepository
{
    public async Task<User?> GetByEmailAsync(string email)
    {
        const string sql = "SELECT TOP 1 * FROM Users WHERE Email = @Email";
        using var conn = context.CreateConnection();
        return await conn.QueryFirstOrDefaultAsync<User>(sql, new { Email = email });
    }

    public async Task<User?> GetByIdAsync(int id)
    {
        const string sql = "SELECT TOP 1 * FROM Users WHERE Id = @Id";
        using var conn = context.CreateConnection();
        return await conn.QueryFirstOrDefaultAsync<User>(sql, new { Id = id });
    }

    public async Task<IReadOnlyList<User>> GetAllAsync()
    {
        const string sql = "SELECT Id, FullName, Email, Role, IsActive, CreatedAt FROM Users ORDER BY Id DESC";
        using var conn = context.CreateConnection();
        var users = await conn.QueryAsync<User>(sql);
        return users.ToList();
    }

    public async Task<int> CreateAsync(User user)
    {
        const string sql = @"
            INSERT INTO Users (FullName, Email, PasswordHash, Role, IsActive, CreatedAt)
            OUTPUT INSERTED.Id
            VALUES (@FullName, @Email, @PasswordHash, @Role, @IsActive, @CreatedAt);";

        using var conn = context.CreateConnection();
        return await conn.ExecuteScalarAsync<int>(sql, user);
    }

    public async Task<bool> ExistsByEmailAsync(string email)
    {
        const string sql = "SELECT CAST(CASE WHEN EXISTS (SELECT 1 FROM Users WHERE Email = @Email) THEN 1 ELSE 0 END AS BIT)";
        using var conn = context.CreateConnection();
        return await conn.ExecuteScalarAsync<bool>(sql, new { Email = email });
    }

    public async Task<bool> MasterAdminExistsAsync()
    {
        const string sql = "SELECT CAST(CASE WHEN EXISTS (SELECT 1 FROM Users WHERE Role = 'MasterAdmin') THEN 1 ELSE 0 END AS BIT)";
        using var conn = context.CreateConnection();
        return await conn.ExecuteScalarAsync<bool>(sql);
    }
}
