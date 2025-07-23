using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/professional-services")]
    public class ProfessionalServiceMappingController : ControllerBase
    {
        private readonly IProfessionalServiceMappingService _service;

        public ProfessionalServiceMappingController(IProfessionalServiceMappingService service) => _service = service;

        [HttpPost]
        public async Task<IActionResult> Assign([FromBody] ServiceAssignmentRequest request)
        {
            await _service.AssignServiceAsync(request.ProfessionalId, request.ServiceId);
            return Ok();
        }

        [HttpGet("/api/professionals/{id}/services")]
        public async Task<IActionResult> GetServices(long id)
        {
            var services = await _service.GetServicesByProfessionalIdAsync(id);
            return Ok(services);
        }

        [HttpDelete]
        public async Task<IActionResult> Unassign([FromBody] ServiceAssignmentRequest request)
        {
            await _service.UnassignServiceAsync(request.ProfessionalId, request.ServiceId);
            return Ok();
        }
    }

    public class ServiceAssignmentRequest
    {
        public long ProfessionalId { get; set; }
        public long ServiceId { get; set; }
    }

}
