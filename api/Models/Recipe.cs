namespace api.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int RecipeCategoryId { get; set; } = 0;
        public RecipeCategory? RecipeCategory { get; set; }
        public string Steps { get; set; } = string.Empty;
        public string? ImageUrl { get; set; } = string.Empty;
        public bool IsPublished { get; set; } = false;
        public int UserId { get; set; } = 0;
        public User? User { get; set; }
        public ICollection<ProductInRecipe>? ProductsInRecipes { get; set; } = null!;
        public ICollection<RecipeReview>? Reviews { get; set; } = null!;
    }
}