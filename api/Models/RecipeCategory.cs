namespace api.Models
{
    public class RecipeCategory
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public ICollection<Recipe>? Recipes { get; set; } = null!;
    }
}