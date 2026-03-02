using FIRY_Master.Application.Contracts;
using FIRY_Master.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FIRY_Master.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "MasterAdmin")]
public class RbacController : ControllerBase
{
    private readonly RbacService _rbacService;

    public RbacController(RbacService rbacService)
    {
        _rbacService = rbacService;
    }

    [HttpPost("roles")]
    public async Task<IActionResult> CreateRole([FromBody] CreateRoleRequest request)
        => Ok(new { id = await _rbacService.CreateRoleAsync(request) });

    [HttpPost("users")]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest request)
        => Ok(new { id = await _rbacService.CreateUserAsync(request) });

    [HttpPost("pages")]
    public async Task<IActionResult> CreatePage([FromBody] CreatePageRequest request)
        => Ok(new { id = await _rbacService.CreatePageAsync(request) });

    [HttpPut("permissions")]
    public async Task<IActionResult> SetPermissions([FromBody] SetRolePermissionsRequest request)
    {
        await _rbacService.SetRolePermissionsAsync(request);
        return NoContent();
    }

    [HttpGet("roles")]
    public async Task<IActionResult> GetRoles() => Ok(await _rbacService.GetRolesAsync());

    [HttpGet("users")]
    public async Task<IActionResult> GetUsers() => Ok(await _rbacService.GetUsersAsync());

    [HttpGet("pages")]
    public async Task<IActionResult> GetPages() => Ok(await _rbacService.GetPagesAsync());

    [HttpGet("permissions/{roleId:int}")]
    public async Task<IActionResult> GetPermissionsByRole(int roleId) => Ok(await _rbacService.GetPageIdsByRoleIdAsync(roleId));
}
