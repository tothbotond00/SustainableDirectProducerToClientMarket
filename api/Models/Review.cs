namespace api.Models
{
    public class Review
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public int Rating { get; set; }
        public DateTime Date { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public int ProductId { get; set; }
        public Product? Product { get; set; }
        public int RecipeId { get; set; }
        public Recipe? Recipe { get; set; }
    }
}