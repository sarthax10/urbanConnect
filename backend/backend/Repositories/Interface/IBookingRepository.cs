using backend.DTO;
using backend.Models;

namespace backend.Repositories
{
    public interface IBookingRepository
    {
        Task<Booking?> GetBookingByIdAsync(long id);
        Task<IEnumerable<Booking>> GetBookingsByUserIdAsync(long userId);
        Task<IEnumerable<Booking>> GetBookingsByProfessionalIdAsync(long professionalId);
        Task<long> CreateBookingAsync(Booking booking);
        Task UpdateBookingStatusAsync(long bookingId, string status);
        Task<IEnumerable<AvailableSlotDto>> GetAvailableSlotsAsync(long serviceId, DateOnly date);
        Task<IEnumerable<Booking>> GetAllBookingsAsync();
        Task<IEnumerable<Booking>> GetBookingsByStatusAsync(BookingStatus status);
        Task UpdateBookingAsync(Booking booking);
        Task<IEnumerable<UpcomingBookingDto>> GetUpcomingBookingsForUserAsync(long userId);
    }
}
