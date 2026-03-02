namespace FIRY_Master.Domain.Entities;

public record RoleDto(int Id, string Name);
public record UserDto(int Id, string Username, bool IsActive, string Role);
public record PageDto(int Id, string Name, string Route);
