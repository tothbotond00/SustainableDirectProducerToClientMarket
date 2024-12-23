namespace api.Models
{
    public class ProductInRecipe
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product? Product { get; set; }
        public int RecipeId { get; set; }
        public Recipe? Recipe { get; set; }
        public int Quantity { get; set; }
    }
}