using FIRY_Master.Application.Contracts;
using FIRY_Master.Application.Security;
using FIRY_Master.Domain.Entities;
using FIRY_Master.Domain.Interfaces;

namespace FIRY_Master.Application.Services;

public class RbacService
{
    private readonly IRbacRepository _rbacRepository;

    public RbacService(IRbacRepository rbacRepository)
    {
        _rbacRepository = rbacRepository;
    }

    public Task<int> CreateRoleAsync(CreateRoleRequest request) => _rbacRepository.CreateRoleAsync(request.Name);

    public Task<int> CreatePageAsync(CreatePageRequest request) => _rbacRepository.CreatePageAsync(request.Name, request.Route);

    public Task SetRolePermissionsAsync(SetRolePermissionsRequest request) =>
        _rbacRepository.SetRolePagePermissionsAsync(request.RoleId, request.PageIds);

    public Task<int> CreateUserAsync(CreateUserRequest request)
    {
        var hash = PasswordHasher.Hash(request.Password);
        return _rbacRepository.CreateUserAsync(request.Username, hash, request.RoleId);
    }

    public Task<IReadOnlyList<RoleDto>> GetRolesAsync() => _rbacRepository.GetRolesAsync();
    public Task<IReadOnlyList<UserDto>> GetUsersAsync() => _rbacRepository.GetUsersAsync();
    public Task<IReadOnlyList<PageDto>> GetPagesAsync() => _rbacRepository.GetPagesAsync();
    public Task<IReadOnlyList<int>> GetPageIdsByRoleIdAsync(int roleId) => _rbacRepository.GetPageIdsByRoleIdAsync(roleId);
}
