namespace FIRY_Master.Application.Contracts;

public record LoginRequest(string Username, string Password);
public record LoginResponse(string Token, string Username, string Role, IReadOnlyList<string> AllowedRoutes);

public record CreateRoleRequest(string Name);
public record CreateUserRequest(string Username, string Password, int RoleId);
public record CreatePageRequest(string Name, string Route);
public record SetRolePermissionsRequest(int RoleId, List<int> PageIds);
