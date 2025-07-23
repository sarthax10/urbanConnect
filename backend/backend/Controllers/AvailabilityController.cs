using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/availability")]
    public class AvailabilityController : ControllerBase
    {
        private readonly IAvailabilityService _availabilityService;

        public AvailabilityController(IAvailabilityService availabilityService)
        {
            _availabilityService = availabilityService;
        }

        // ✔ Create a new availability slot
        [HttpPost]
        public async Task<IActionResult> AddAvailability([FromBody] ProfessionalAvailability availability)
        {
            if (availability == null || availability.ProfessionalId == 0)
                return BadRequest("Invalid availability data.");

            await _availabilityService.AddAvailabilityAsync(availability);
            return Ok("Availability created successfully.");
        }

        // ✔ Get availability slot by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(long id)
        {
            var result = await _availabilityService.GetByIdAsync(id);
            return result != null ? Ok(result) : NotFound("Availability not found.");
        }

        // ✔ Get all availability slots for a professional
        [HttpGet("professional/{professionalId}")]
        public async Task<IActionResult> GetByProfessionalId(long professionalId)
        {
            var slots = await _availabilityService.GetByProfessionalIdAsync(professionalId);
            return Ok(slots);
        }

        // ✔ Get only available (not booked) slots for a professional on a specific day
        [HttpGet("available")]
        public async Task<IActionResult> GetAvailableSlots([FromQuery] long professionalId, [FromQuery] string date)
        {
            if (!DateOnly.TryParse(date, out var parsedDate))
                return BadRequest("Invalid date format. Use yyyy-MM-dd");

            var slots = await _availabilityService.GetAvailableSlotsByDateAsync(professionalId, parsedDate);
            return Ok(slots);
        }

        // ✔ Update availability slot
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAvailability(long id, [FromBody] ProfessionalAvailability updatedAvailability)
        {
            if (updatedAvailability == null || id != updatedAvailability.AvailabilityId)
                return BadRequest("Invalid data.");

            await _availabilityService.UpdateAvailabilityAsync(updatedAvailability);
            return NoContent(); // success, no content
        }

        // ✔ Delete an availability slot
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAvailability(long id)
        {
            await _availabilityService.DeleteAvailabilityAsync(id);
            return Ok("Availability deleted.");
        }
    }
}
