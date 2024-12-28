using api.Models;

namespace api.Interfaces
{
    public interface IRecipeRepository
    {
        public ICollection<Recipe> GetRecipes(); // return all recipes
        public Recipe? GetRecipeByUser(int userId); // return recipe by id
        public bool CreateRecipe(Recipe recipe); // create a new recipe
        public bool AddProductToRecipe(int recipeId, int? productId, string? productName, int quantity); // add a product to a recipe
        public bool UpdateRecipe(Recipe recipe); // update a recipe
        public bool DeleteRecipe(int id); // delete a recipe
        public bool DeleteProductInRecipe(int recipeId, int? productId, string? productName); // delete a product from a recipe
        bool Save();
    }
}