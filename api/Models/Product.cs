namespace api.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public float Price { get; set; } = 0;
        public string? ImageUrl { get; set; } = string.Empty;
        public int Stock { get; set; } = 0;
        public int CategoryId { get; set; } = 0;
        public Category? Category { get; set; }
        public int UserId { get; set; } = 0;
        public User? User { get; set; }
        public ICollection<Review>? Reviews { get; set; } = null!;
        public ICollection<ProductInBasket>? ProductsInBaskets { get; set; } = null!;
    }
}