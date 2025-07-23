public class BookingRequestDto
{
    public long UserId { get; set; }
    public long ProfessionalId { get; set; }
    public long ServiceId { get; set; }
    public long AvailabilityId { get; set; }
    public DateTime ScheduledStart { get; set; }
    public DateTime ScheduledEnd { get; set; }
}
public class UpdateStatusDto
{
    public string Status { get; set; }
}
public class CreateProfessionalReviewDto
{
    public long BookingId { get; set; }
    public int Rating { get; set; }
    public string? Comment { get; set; }
    public string Email { get; set; }
}
public class RescheduleBookingDto
{
    public DateTime ScheduledStart { get; set; }
    public DateTime ScheduledEnd { get; set; }
}
public class UpcomingBookingDto
{
    public long BookingId { get; set; }
    public long UserId { get; set; }
    public long ProfessionalId { get; set; }
    public long ServiceId { get; set; }
    public DateTime ScheduledStart { get; set; }
    public DateTime ScheduledEnd { get; set; }
    public string Status { get; set; }
    public string ServiceName { get; set; }
    public string ProfessionalName { get; set; }
}