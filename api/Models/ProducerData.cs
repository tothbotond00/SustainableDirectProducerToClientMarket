namespace api.Models
{
    public class ProducerData
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Profession { get; set; } = string.Empty;
        public byte[]? Image_One { get; set; } = null!;
        public byte[]? Image_Two { get; set; } = null!;
        public byte[]? Image_Three { get; set; } = null!;
        public byte[]? Image_Profile { get; set; } = null!;
        public string? ImageUrl { get; set; } = string.Empty;
        public int UserId { get; set; }
        public User? User { get; set; }
    }
}