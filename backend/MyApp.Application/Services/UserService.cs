using MyApp.Application.DTOs;
using MyApp.Application.Interfaces;
using MyApp.Domain.Entities;

namespace MyApp.Application.Services;

public class UserService(IUserRepository userRepository)
{
    private static readonly HashSet<string> AllowedRoles = ["MasterAdmin", "Admin", "User"];

    public async Task<int> CreateUserAsync(CreateUserDto dto)
    {
        var email = dto.Email.Trim().ToLowerInvariant();
        if (string.IsNullOrWhiteSpace(dto.FullName) || string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(dto.Password))
        {
            throw new ArgumentException("Required fields are missing.");
        }

        if (!AllowedRoles.Contains(dto.Role))
        {
            throw new ArgumentException("Invalid role.");
        }

        if (await userRepository.ExistsByEmailAsync(email))
        {
            throw new InvalidOperationException("Email already exists.");
        }

        var user = new User
        {
            FullName = dto.FullName.Trim(),
            Email = email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = dto.Role,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        return await userRepository.CreateAsync(user);
    }

    public Task<IReadOnlyList<User>> GetUsersAsync() => userRepository.GetAllAsync();

    public async Task SeedMasterAdminAsync()
    {
        if (await userRepository.MasterAdminExistsAsync())
        {
            return;
        }

        var master = new User
        {
            FullName = "Master Admin",
            Email = "master@admin.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
            Role = "MasterAdmin",
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        await userRepository.CreateAsync(master);
    }
}
