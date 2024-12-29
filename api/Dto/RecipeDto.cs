namespace api.Dto
{
    public class RecipeDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int RecipeCategoryId { get; set; } = 0;
        public string Steps { get; set; } = string.Empty;
        public IFormFile? Image { get; set; } = null!;
        public bool IsPublished { get; set; } = false;
        public int UserId { get; set; } = 0;
    }
}