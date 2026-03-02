using FIRY_Master.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace FIRY_Master.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthController : ControllerBase
    {
        private readonly HealthService _service;

        public HealthController(HealthService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _service.GetHealthAsync();
            return Ok(result);
        }
    }
}
