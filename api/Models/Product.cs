namespace api.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public float Price { get; set; } = 0;
        public string? ImageUrl { get; set; } = string.Empty;
        public byte[]? Image { get; set; } = null!;
        public int Stock { get; set; } = 0;
        public string Unit { get; set; } = string.Empty;
        public int CategoryId { get; set; } = 0;
        public Category? Category { get; set; }
        public int UserId { get; set; } = 0;
        public User? User { get; set; }
        public ICollection<ProductReview>? Reviews { get; set; } = null!;
        public ICollection<ProductInBasket>? ProductsInBaskets { get; set; } = null!;
        public ICollection<ProductInRecipe>? ProductsInRecipes { get; set; } = null!;
        public ICollection<ProductInOrder>? ProductsInOrders { get; set; } = null!;
    }
}