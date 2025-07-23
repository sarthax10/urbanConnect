using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/reviews")]
    public class ProfessionalReviewController : ControllerBase
    {
        private readonly IProfessionalReviewService _reviewService;
        private readonly IUserService _userService;

        public ProfessionalReviewController(IProfessionalReviewService reviewService, IUserService userService)
        {
            _reviewService = reviewService;
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> PostReview([FromBody] CreateProfessionalReviewDto dto)
        {
            if (dto == null)
                return BadRequest(new { error = "Request payload is missing." });

            if (string.IsNullOrWhiteSpace(dto.Email))
                return BadRequest(new { error = "Email is required." });

            if (dto.Rating < 1 || dto.Rating > 5)
                return BadRequest(new { error = "Rating must be between 1 and 5." });

            try
            {
                var user = await _userService.GetUserByEmailAsync(dto.Email);
                if (user == null || user.UserId == 0)
                    return NotFound(new { error = "User not found in database." });

                var userId = user.UserId;

                await _reviewService.AddReviewAsync(dto, userId);
                return Ok(new { message = "✅ Review submitted successfully." });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error while submitting review: {ex.Message}");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("booking/{bookingId}")]
        public async Task<IActionResult> GetReviewForBooking(long bookingId)
        {
            var review = await _reviewService.GetReviewByBookingIdAsync(bookingId);
            return review != null ? Ok(review) : NotFound();
        }

    }
}
