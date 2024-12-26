namespace api.Models
{
    public class Basket
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public ICollection<ProductInBasket>? ProductsInBasket { get; set; } = null!;
        public bool IsSent { get; set; } = false;
        public float TotalPrice { get; set; } = 0;
    }
}