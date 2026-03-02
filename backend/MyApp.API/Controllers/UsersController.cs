using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyApp.Application.DTOs;
using MyApp.Application.Services;

namespace MyApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UsersController(UserService userService) : ControllerBase
{
    [HttpGet]
    [Authorize(Roles = "MasterAdmin")]
    public async Task<IActionResult> GetAll()
    {
        var users = await userService.GetUsersAsync();
        return Ok(users);
    }

    [HttpPost]
    [Authorize(Roles = "MasterAdmin")]
    public async Task<IActionResult> Create([FromBody] CreateUserDto request)
    {
        var id = await userService.CreateUserAsync(request);
        return CreatedAtAction(nameof(GetAll), new { id }, new { id });
    }
}
