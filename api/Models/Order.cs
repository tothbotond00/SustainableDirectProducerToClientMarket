namespace api.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int ProducerId { get; set; }
        public int CustomerId { get; set; }
        public User? Customer { get; set; }
        public DateTime ReceivedAt { get; set; }
        public DateTime? SentAt { get; set; }
        public bool IsSent { get; set; }
        public float TotalPrice { get; set; }
        public ICollection<ProductInOrder>? Products { get; set; } = null!;
    }
}