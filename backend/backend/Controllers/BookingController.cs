using backend.Models;
using backend.DTO;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/bookings")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        // 🧾 Get all bookings or by status
        [HttpGet]
        public async Task<IActionResult> GetBookings([FromQuery] string? status = null)
        {
            IEnumerable<Booking> bookings;

            if (!string.IsNullOrEmpty(status))
            {
                if (!Enum.TryParse<BookingStatus>(status, true, out var parsed))
                    return BadRequest("Invalid booking status");

                bookings = await _bookingService.GetBookingsByStatusAsync(parsed);
            }
            else
            {
                bookings = await _bookingService.GetAllBookingsAsync();
            }

            return Ok(bookings);
        }

        // ✅ Create new booking
        [HttpPost]
        public async Task<IActionResult> CreateBooking([FromBody] BookingRequestDto request)
        {
            if (request == null || request.UserId == 0 || request.ProfessionalId == 0 || request.ServiceId == 0 || request.AvailabilityId == 0)
                return BadRequest(new { error = "Invalid booking data. All IDs must be non-zero." });

            if (request.ScheduledStart == default || request.ScheduledEnd == default)
                return BadRequest(new { error = "ScheduledStart and ScheduledEnd are required." });

            var booking = new Booking
            {
                UserId = request.UserId,
                ProfessionalId = request.ProfessionalId,
                ServiceId = request.ServiceId,
                ScheduledStart = request.ScheduledStart,
                ScheduledEnd = request.ScheduledEnd,
                Status = BookingStatus.BOOKED.ToString()
            };

            try
            {
                var result = await _bookingService.CreateBookingAsync(booking, request.AvailabilityId);

                if (result == null)
                    return StatusCode(500, new { error = "Booking was saved but could not be retrieved." });

                return Ok(result);
            }
            catch (Exception ex)
            {
                // ✅ structured error format, better than a raw string
                return BadRequest(new { error = ex.Message });
            }
        }

        // 👤 Get user bookings
        [HttpGet("user/{userId:long}")]
        public async Task<IActionResult> GetUserBookings(long userId)
        {
            var bookings = await _bookingService.GetUserBookingsAsync(userId);
            return Ok(bookings);
        }

        // 👨‍🔧 Get pro bookings
        [HttpGet("professional/{professionalId:long}")]
        public async Task<IActionResult> GetProfessionalBookings(long professionalId)
        {
            var bookings = await _bookingService.GetProfessionalBookingsAsync(professionalId);
            return Ok(bookings);
        }

        // 📌 Get booking by ID
        [HttpGet("{id:long}")]
        public async Task<IActionResult> GetBookingById(long id)
        {
            var booking = await _bookingService.GetBookingByIdAsync(id);
            return booking != null ? Ok(booking) : NotFound("Booking not found.");
        }

        // ✅ Update status
        [HttpPut("{id:long}/status")]
        public async Task<IActionResult> UpdateStatus(long id, [FromBody] UpdateStatusDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Status))
                return BadRequest(new { message = "Status is required." });

            if (!Enum.TryParse<BookingStatus>(dto.Status, true, out var parsedStatus))
                return BadRequest(new { message = "Invalid status value." });

            await _bookingService.UpdateBookingStatusAsync(id, parsedStatus.ToString());
            return Ok(new { bookingId = id, newStatus = parsedStatus.ToString() });
        }

        // 📆 Get available slots
        [HttpGet("available-slots")]
        public async Task<IActionResult> GetAvailableSlots([FromQuery] long serviceId, [FromQuery] string date)
        {
            if (serviceId == 0 || !DateOnly.TryParse(date, out var parsedDate))
                return BadRequest("Invalid service ID or date format.");

            var slots = await _bookingService.GetAvailableSlotsAsync(serviceId, parsedDate);
            return Ok(slots);
        }
        [HttpGet("upcoming/{userId:long}")]
        public async Task<IActionResult> GetUpcomingBookings(long userId)
        {
            var bookings = await _bookingService.GetUpcomingBookingsForUserAsync(userId);
            return Ok(bookings);
        }


        // ⏰ Reschedule booking
        [HttpPut("{id:long}/reschedule")]
        public async Task<IActionResult> RescheduleBooking(long id, [FromBody] RescheduleBookingDto dto)
        {
            if (dto.ScheduledStart == default || dto.ScheduledEnd == default)
                return BadRequest("ScheduledStart and ScheduledEnd are required.");

            try
            {
                var booking = await _bookingService.GetBookingByIdAsync(id);
                if (booking == null)
                    return NotFound("Booking not found.");

                // Optional: prevent rescheduling past or completed bookings
                if (booking.Status == BookingStatus.COMPLETED.ToString() || booking.Status == BookingStatus.CANCELED.ToString())
                    return BadRequest("Cannot reschedule a completed or canceled booking.");

                booking.ScheduledStart = dto.ScheduledStart;
                booking.ScheduledEnd = dto.ScheduledEnd;
                booking.Status = BookingStatus.RESCHEDULED.ToString();

                await _bookingService.UpdateBookingAsync(booking);

                return Ok(new
                {
                    bookingId = booking.BookingId,
                    newStart = booking.ScheduledStart,
                    newEnd = booking.ScheduledEnd,
                    status = booking.Status.ToString()
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

    }
}
