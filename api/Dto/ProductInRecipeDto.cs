namespace api.Dto
{
    public class ProductInRecipeDto
    {
        public int? ProductId { get; set; }
        public string? ProductName { get; set; }
        public int RecipeId { get; set; }
        public int Quantity { get; set; }
    }
}