namespace api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public bool IsCustomer { get; set; } = true;
        public string FullName { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string TaxNumber { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; } = new byte[0];
        public byte[] PasswordSalt { get; set; } = new byte[0];
        public ICollection<Product>? Products { get; set; } = null!;
        public ICollection<ProductReview>? Reviews { get; set; } = null!;
        public Basket? Basket { get; set; }
        public ICollection<Recipe>? Recipes { get; set; } = null!;
        public ICollection<Order>? Orders { get; set; } = null!;
        public ProducerData? ProducerData { get; set; }
    }
}