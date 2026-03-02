IF DB_ID('MyAppDb') IS NULL
BEGIN
    CREATE DATABASE MyAppDb;
END
GO

USE MyAppDb;
GO

IF OBJECT_ID('dbo.Users', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Users
    (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        FullName NVARCHAR(150) NOT NULL,
        Email NVARCHAR(256) NOT NULL,
        PasswordHash NVARCHAR(255) NOT NULL,
        Role NVARCHAR(50) NOT NULL CHECK (Role IN ('MasterAdmin', 'Admin', 'User')),
        IsActive BIT NOT NULL CONSTRAINT DF_Users_IsActive DEFAULT(1),
        CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_Users_CreatedAt DEFAULT(SYSUTCDATETIME())
    );
END
GO

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'UX_Users_Email' AND object_id = OBJECT_ID('dbo.Users'))
BEGIN
    CREATE UNIQUE INDEX UX_Users_Email ON dbo.Users(Email);
END
GO

IF NOT EXISTS (SELECT 1 FROM dbo.Users WHERE Role = 'MasterAdmin')
BEGIN
    INSERT INTO dbo.Users (FullName, Email, PasswordHash, Role, IsActive, CreatedAt)
    VALUES (
        'Master Admin',
        'master@admin.com',
        '$2b$12$M9z6h0VVN6kJw4T8F9Jm7e8xJ8Qw1QG7A9CyK2l7UFzz1v5w0IrXW',
        'MasterAdmin',
        1,
        SYSUTCDATETIME()
    );
END
GO
