using backend.Models;
using backend.DTO;
using backend.Repositories;

namespace backend.Services
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _bookingRepo;
        private readonly IAvailabilityRepository _availabilityRepo;
        private readonly IServiceRepository _serviceRepo;

        public BookingService(
            IBookingRepository bookingRepo,
            IAvailabilityRepository availabilityRepo,
            IServiceRepository serviceRepo)
        {
            _bookingRepo = bookingRepo;
            _availabilityRepo = availabilityRepo;
            _serviceRepo = serviceRepo;
        }

        public async Task<Booking> CreateBookingAsync(Booking booking, long availabilityId)
        {
            // Step 1: Validate input
            if (booking == null)
                throw new ArgumentNullException(nameof(booking));

            // Step 2: Get availability
            var availability = await _availabilityRepo.GetAvailabilityByIdAsync(availabilityId);
            if (availability == null)
                throw new Exception("Availability not found.");
            if (availability.IsBooked)
                throw new Exception("This slot is already booked.");

            // Step 3: Get service duration
            var duration = await _serviceRepo.GetServiceDurationInMinutesAsync(booking.ServiceId);
            if (duration <= 0)
                throw new Exception("Invalid service duration.");

            // Step 4: Compute scheduled end
            var scheduledStart = booking.ScheduledStart;
            var scheduledEnd = scheduledStart.AddMinutes(duration);
            booking.ScheduledEnd = scheduledEnd;
            booking.Status = BookingStatus.BOOKED.ToString();

            // Step 5: Validate booking fits in the availability window
            if (booking.ScheduledStart.ToUniversalTime() < availability.StartTime.ToUniversalTime()
 || booking.ScheduledEnd.ToUniversalTime() > availability.EndTime.ToUniversalTime())
            {
                throw new Exception("Requested schedule is outside availability.");
            }

            // Step 6: Mark original availability as booked
            availability.IsBooked = true;
            await _availabilityRepo.UpdateAvailabilityAsync(availability);

            // Step 7: Create leftover slots
            // Before-slot insertion
            if (availability.StartTime.ToUniversalTime() < scheduledStart.ToUniversalTime())
            {
                if (availability.StartTime < booking.ScheduledStart)
                {
                    var beforeSlot = new ProfessionalAvailability
                    {
                        ProfessionalId = availability.ProfessionalId,
                        StartTime = availability.StartTime,
                        EndTime = booking.ScheduledStart,
                        IsBooked = false
                    };

                    // Add this check to prevent garbage
                    if (beforeSlot.StartTime < beforeSlot.EndTime)
                    {
                        await _availabilityRepo.AddAvailabilityAsync(beforeSlot);
                    }
                }

            }

            // After-slot insertion
            if (scheduledEnd.ToUniversalTime() < availability.EndTime.ToUniversalTime())
            {
                if (booking.ScheduledEnd < availability.EndTime)
                {
                    var afterSlot = new ProfessionalAvailability
                    {
                        ProfessionalId = availability.ProfessionalId,
                        StartTime = booking.ScheduledEnd,
                        EndTime = availability.EndTime,
                        IsBooked = false
                    };

                    if (afterSlot.StartTime < afterSlot.EndTime)
                    {
                        await _availabilityRepo.AddAvailabilityAsync(afterSlot);
                    }
                }
            }

            // Step 8: Create booking
            var bookingId = await _bookingRepo.CreateBookingAsync(booking);

            // Step 9: Return full booking
            return await _bookingRepo.GetBookingByIdAsync(bookingId)
                ?? throw new Exception("Booking creation failed.");
        }

        public Task<IEnumerable<Booking>> GetUserBookingsAsync(long userId)
            => _bookingRepo.GetBookingsByUserIdAsync(userId);

        public Task<IEnumerable<Booking>> GetProfessionalBookingsAsync(long professionalId)
            => _bookingRepo.GetBookingsByProfessionalIdAsync(professionalId);

        public Task<Booking?> GetBookingByIdAsync(long id)
            => _bookingRepo.GetBookingByIdAsync(id);

        public Task UpdateBookingStatusAsync(long bookingId, string status)
            => _bookingRepo.UpdateBookingStatusAsync(bookingId, status);

        public Task<IEnumerable<AvailableSlotDto>> GetAvailableSlotsAsync(long serviceId, DateOnly date)
            => _bookingRepo.GetAvailableSlotsAsync(serviceId, date);

        public async Task<IEnumerable<Booking>> GetAllBookingsAsync()
    => await _bookingRepo.GetAllBookingsAsync();

        public async Task<IEnumerable<Booking>> GetBookingsByStatusAsync(BookingStatus status)
            => await _bookingRepo.GetBookingsByStatusAsync(status);

        public async Task UpdateBookingAsync(Booking booking)
        {
            await _bookingRepo.UpdateBookingAsync(booking);
        }
        public async Task<IEnumerable<UpcomingBookingDto>> GetUpcomingBookingsForUserAsync(long userId)
        {
            return await _bookingRepo.GetUpcomingBookingsForUserAsync(userId);
        }


    }
}
