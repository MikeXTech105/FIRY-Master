using Dapper;
using FIRY_Master.Application.Security;

namespace FIRY_Master.Infrastructure.Data;

public class DatabaseInitializer
{
    private readonly DapperContext _context;

    public DatabaseInitializer(DapperContext context)
    {
        _context = context;
    }

    public async Task InitializeAsync()
    {
        using var connection = _context.CreateConnection();

        var script = @"
IF OBJECT_ID('Roles', 'U') IS NULL
BEGIN
    CREATE TABLE Roles (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(100) NOT NULL UNIQUE
    );
END

IF OBJECT_ID('Pages', 'U') IS NULL
BEGIN
    CREATE TABLE Pages (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(100) NOT NULL,
        Route NVARCHAR(200) NOT NULL UNIQUE
    );
END

IF OBJECT_ID('Users', 'U') IS NULL
BEGIN
    CREATE TABLE Users (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Username NVARCHAR(100) NOT NULL UNIQUE,
        PasswordHash NVARCHAR(500) NOT NULL,
        RoleId INT NOT NULL,
        IsActive BIT NOT NULL DEFAULT(1),
        CONSTRAINT FK_Users_Roles FOREIGN KEY (RoleId) REFERENCES Roles(Id)
    );
END

IF OBJECT_ID('RolePagePermissions', 'U') IS NULL
BEGIN
    CREATE TABLE RolePagePermissions (
        RoleId INT NOT NULL,
        PageId INT NOT NULL,
        PRIMARY KEY (RoleId, PageId),
        CONSTRAINT FK_RolePagePermissions_Roles FOREIGN KEY (RoleId) REFERENCES Roles(Id),
        CONSTRAINT FK_RolePagePermissions_Pages FOREIGN KEY (PageId) REFERENCES Pages(Id)
    );
END";

        await connection.ExecuteAsync(script);

        var masterRoleId = await connection.ExecuteScalarAsync<int?>("SELECT Id FROM Roles WHERE Name = 'MasterAdmin'");
        if (masterRoleId is null)
        {
            masterRoleId = await connection.ExecuteScalarAsync<int>("INSERT INTO Roles(Name) VALUES('MasterAdmin'); SELECT CAST(SCOPE_IDENTITY() as int);");
        }

        var defaultPages = new[]
        {
            ("Dashboard", "/dashboard"),
            ("Users", "/users"),
            ("Roles", "/roles"),
            ("Permissions", "/permissions")
        };

        foreach (var page in defaultPages)
        {
            var pageId = await connection.ExecuteScalarAsync<int?>("SELECT Id FROM Pages WHERE Route=@Route", new { page.Route });
            if (pageId is null)
            {
                pageId = await connection.ExecuteScalarAsync<int>("INSERT INTO Pages(Name, Route) VALUES(@Name, @Route); SELECT CAST(SCOPE_IDENTITY() as int);", new { Name = page.Item1, Route = page.Item2 });
            }

            await connection.ExecuteAsync(@"
IF NOT EXISTS (SELECT 1 FROM RolePagePermissions WHERE RoleId = @RoleId AND PageId = @PageId)
    INSERT INTO RolePagePermissions(RoleId, PageId) VALUES(@RoleId, @PageId)", new { RoleId = masterRoleId, PageId = pageId });
        }

        var existingAdmin = await connection.ExecuteScalarAsync<int?>("SELECT Id FROM Users WHERE Username = 'admin'");
        if (existingAdmin is null)
        {
            var hash = PasswordHasher.Hash("Admin@123");
            await connection.ExecuteAsync("INSERT INTO Users(Username, PasswordHash, RoleId, IsActive) VALUES('admin', @hash, @roleId, 1)", new { hash, roleId = masterRoleId });
        }
    }
}
