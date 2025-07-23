using backend.DTO;
using backend.Models;
using Dapper;
using System.Data;

namespace backend.Repositories
{
    public class BookingRepository : IBookingRepository
    {
        private readonly IDbConnection _db;

        public BookingRepository(IDbConnection db)
        {
            _db = db;
        }

        // ✅ Insert a booking (validated by service layer)
        public async Task<long> CreateBookingAsync(Booking booking)
        {
            if (_db.State != ConnectionState.Open)
                _db.Open();

            using var tx = _db.BeginTransaction();

            try
            {
                var sql = @"
                    INSERT INTO bookings (
                        user_id, 
                        professional_id, 
                        service_id, 
                        scheduled_start, 
                        scheduled_end, 
                        status,
                        created_at
                    )
                    VALUES (
                        @UserId, 
                        @ProfessionalId, 
                        @ServiceId, 
                        @ScheduledStart, 
                        @ScheduledEnd, 
                        @Status, 
                        NOW()
                    );
                    SELECT LAST_INSERT_ID();";

                var parameters = new
                {
                    booking.UserId,
                    booking.ProfessionalId,
                    booking.ServiceId,
                    booking.ScheduledStart,
                    booking.ScheduledEnd,
                    Status = booking.Status.ToString(), // ✅ convert enum to string
                };

                var bookingId = await _db.ExecuteScalarAsync<long>(sql, parameters, tx);

                tx.Commit();
                return bookingId;
            }
            catch
            {
                tx.Rollback();
                throw;
            }
        }

        // 🔍 Get booking by ID
        public async Task<Booking?> GetBookingByIdAsync(long id)
        {
            var sql = "SELECT * FROM bookings WHERE booking_id = @Id";
            return await _db.QueryFirstOrDefaultAsync<Booking>(sql, new { Id = id });
        }

        // 🔍 Get user's bookings
        public async Task<IEnumerable<Booking>> GetBookingsByUserIdAsync(long userId)
        {
            var sql = "SELECT * FROM bookings WHERE user_id = @UserId";
            return await _db.QueryAsync<Booking>(sql, new { UserId = userId });
        }

        // 🔍 Get professional's bookings
        public async Task<IEnumerable<Booking>> GetBookingsByProfessionalIdAsync(long professionalId)
        {
            var sql = "SELECT * FROM bookings WHERE professional_id = @ProfessionalId";
            return await _db.QueryAsync<Booking>(sql, new { ProfessionalId = professionalId });
        }

        // 🔄 Update booking status
        public async Task UpdateBookingStatusAsync(long bookingId, string status)
        {
            var sql = @"
                UPDATE bookings 
                SET status = @Status, updated_at = NOW()
                WHERE booking_id = @BookingId";
            await _db.ExecuteAsync(sql, new { BookingId = bookingId, Status = status });
        }

        // 📆 Fetch available slots by service and date
        public async Task<IEnumerable<AvailableSlotDto>> GetAvailableSlotsAsync(long serviceId, DateOnly date)
        {
            try
            {
                var sql = @"
            SELECT 
                pa.availability_id AS AvailabilityId,
                pa.professional_id AS ProfessionalId,
                pa.start_time AS StartTime,
                pa.end_time AS EndTime
            FROM professional_availability pa
            JOIN professional_services ps ON pa.professional_id = ps.professional_id
            WHERE ps.service_id = @ServiceId
              AND DATE(pa.start_time) = @Date
              AND pa.is_booked = FALSE";

                var result = await _db.QueryAsync<AvailableSlotDto>(sql, new
                {
                    ServiceId = serviceId,
                    Date = date.ToString("yyyy-MM-dd")
                });

                Console.WriteLine($"✅ Found {result.Count()} slots");
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine("🔥 ERROR in GetAvailableSlotsAsync: " + ex.Message);
                throw;
            }
        }

        public async Task<IEnumerable<Booking>> GetAllBookingsAsync()
        {
            var sql = "SELECT * FROM bookings ORDER BY scheduled_start ASC";
            return await _db.QueryAsync<Booking>(sql);
        }

        public async Task<IEnumerable<Booking>> GetBookingsByStatusAsync(BookingStatus status)
        {
            var sql = "SELECT * FROM bookings WHERE status = @Status ORDER BY scheduled_start ASC";
            return await _db.QueryAsync<Booking>(sql, new { Status = status.ToString() });
        }
        public async Task UpdateBookingAsync(Booking booking)
        {
            var sql = @"
        UPDATE bookings
        SET scheduled_start = @ScheduledStart,
            scheduled_end = @ScheduledEnd,
            status = @Status,
            updated_at = NOW()
        WHERE booking_id = @BookingId";

            await _db.ExecuteAsync(sql, booking);
        }

        public async Task<IEnumerable<UpcomingBookingDto>> GetUpcomingBookingsForUserAsync(long userId)
        {
            var result = await _db.QueryAsync<UpcomingBookingDto>(
                "SP_GetUpcomingBookingsForUser",
                new { p_userId = userId },
                commandType: CommandType.StoredProcedure
            );
            return result;
        }
    }
}
