using FIRY_Master.Application.Contracts;
using FIRY_Master.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace FIRY_Master.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var result = await _authService.LoginAsync(request);
        if (result is null)
        {
            return Unauthorized(new { message = "Invalid credentials" });
        }

        return Ok(result);
    }
}
