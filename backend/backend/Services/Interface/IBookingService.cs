using backend.Models;
using backend.DTO;

namespace backend.Services
{
    public interface IBookingService
    {
        Task<Booking> CreateBookingAsync(Booking booking, long availabilityId);
        Task<IEnumerable<Booking>> GetUserBookingsAsync(long userId);
        Task<IEnumerable<Booking>> GetProfessionalBookingsAsync(long professionalId);
        Task<Booking?> GetBookingByIdAsync(long id);
        Task UpdateBookingStatusAsync(long bookingId, string status);
        Task<IEnumerable<AvailableSlotDto>> GetAvailableSlotsAsync(long serviceId, DateOnly date);

        Task<IEnumerable<Booking>> GetAllBookingsAsync();
        Task<IEnumerable<Booking>> GetBookingsByStatusAsync(BookingStatus status);
        Task UpdateBookingAsync(Booking booking);
        Task<IEnumerable<UpcomingBookingDto>> GetUpcomingBookingsForUserAsync(long userId);
    }
}
