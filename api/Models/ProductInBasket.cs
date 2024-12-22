namespace api.Models
{
    public class ProductInBasket
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product? Product { get; set; }
        public int BasketId { get; set; }
        public Basket? Basket { get; set; }
        public int Quantity { get; set; }
    }
}