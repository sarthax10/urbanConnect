using backend.DTO;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/professionals")]
    public class ProfessionalController : ControllerBase
    {
        private readonly IProfessionalService _service;

        public ProfessionalController(IProfessionalService service) => _service = service;

        // GET /api/professionals
        [HttpGet("details")]
        public async Task<IActionResult> GetAllDetails()
        {
            var professionals = await _service.GetAllAsync();
            return Ok(professionals);
        }

        // GET /api/professionals/details/{id}
        [HttpGet("details/{id}")]
        public async Task<IActionResult> GetById(long id)
        {
            var professional = await _service.GetByIdAsync(id);
            return professional is not null ? Ok(professional) : NotFound();
        }

        // POST /api/professionals/details
        [HttpPost("details")]
        public async Task<IActionResult> CreateDetail([FromBody] ProfessionalDetails detail)
        {
            await _service.CreateAsync(detail);
            return CreatedAtAction(nameof(GetById), new { id = detail.ProfessionalId }, detail);
        }

        // PUT /api/professionals/details
        [HttpPut("details")]
        public async Task<IActionResult> UpdateDetail([FromBody] ProfessionalDetails detail)
        {
            await _service.UpdateAsync(detail);
            return NoContent();
        }

        // --- Admin functionality: Manage full professional with services ---
        // GET /api/professionals
        [HttpGet]
        public async Task<IActionResult> GetAllWithServices() =>
            Ok(await _service.GetAll());

        // POST /api/professionals
        [HttpPost]
        public async Task<IActionResult> CreateWithServices([FromBody] CreateProfessionalDto dto)
        {
            var result = await _service.Create(dto);
            return result ? Ok("Professional created") : BadRequest("Failed to create professional");
        }

        [HttpGet("service/{serviceId}")]
        public async Task<IActionResult> GetByService(long serviceId)
        {
            var pros = await _service.GetByServiceId(serviceId);
            return Ok(pros);
        }

        [HttpGet("top-booked")]
        public async Task<IActionResult> GetTopBookedProfessionals()
        {
            var result = await _service.GetTopBookedProfessionalsAsync();
            return Ok(result);
        }
    }
}
