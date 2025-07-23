namespace backend.Models
{
    public class User
    {
        public long UserId { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Role { get; set; } = null!; // "customer" or "professional"
        public DateTime CreatedAt { get; set; }
    }
}
