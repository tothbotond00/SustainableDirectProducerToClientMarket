using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class RecipeRepository : IRecipeRepository
    {
        private readonly DataContext _context;

        public RecipeRepository(DataContext context)
        {
            _context = context;
        }

        public ICollection<Recipe> GetRecipes()
        {
            return _context.Recipes
                .Include(r => r.ProductsInRecipes!)
                .ThenInclude(p => p.Product)
                .Include(r => r.Reviews)
                .ToList();
        }

        public Recipe? GetRecipeByUser(int userId)
        {
            return _context.Recipes
                .Include(r => r.ProductsInRecipes!)
                .ThenInclude(p => p.Product)
                .FirstOrDefault(x => x.UserId == userId);
        }

        public bool CreateRecipe(Recipe recipe)
        {
            _context.Recipes.Add(recipe);
            return Save();
        }

        public bool AddProductToRecipe(int recipeId, int? productId, string? productName, int quantity)
        {
            var recipe = _context.Recipes
                .Include(r => r.ProductsInRecipes)
                .FirstOrDefault(x => x.Id == recipeId);

            if (recipe == null)
            {
                return false;
            }

            if (recipe.ProductsInRecipes == null)
            {
                recipe.ProductsInRecipes = new List<ProductInRecipe>();
            }

            if(productId == null && productName != null)
            {
                if(recipe.ProductsInRecipes == null)
                {
                    recipe.ProductsInRecipes = new List<ProductInRecipe>();
                }
                var productInRecipe = recipe.ProductsInRecipes.FirstOrDefault(x => x.ProductName == productName);
                if (productInRecipe != null)
                {
                    productInRecipe.Quantity += quantity;
                    return Save();
                }
                else
                {
                    recipe.ProductsInRecipes.Add(new ProductInRecipe
                    {
                        ProductName = productName,
                        Quantity = quantity
                    });
                }
            }
            else
            {
                var productInRecipe = recipe.ProductsInRecipes.FirstOrDefault(x => x.ProductId == productId);
                if (productInRecipe != null)
                {
                    productInRecipe.Quantity += quantity;
                    return Save();
                }
                else
                {
                    recipe.ProductsInRecipes.Add(new ProductInRecipe
                    {
                        ProductId = productId,
                        Quantity = quantity
                    });
                }
            }
            return Save();
        }

        public bool UpdateRecipe(Recipe recipe)
        {
            var recipeToUpdate = _context.Recipes.FirstOrDefault(x => x.Id == recipe.Id);
            if (recipeToUpdate == null)
            {
                return false;
            }
            recipeToUpdate.Title = recipe.Title;
            recipeToUpdate.Description = recipe.Description;
            recipeToUpdate.RecipeCategoryId = recipe.RecipeCategoryId;
            recipeToUpdate.Steps = recipe.Steps;
            recipeToUpdate.IsPublished = recipe.IsPublished;
            return Save();
        }

        public bool DeleteRecipe(int id)
        {
            var recipe = _context.Recipes.FirstOrDefault(x => x.Id == id);
            if (recipe == null)
            {
                return false;
            }
            if(recipe.ProductsInRecipes != null)
            {
                _context.ProductInRecipes.RemoveRange(recipe.ProductsInRecipes);
            }
            _context.Recipes.Remove(recipe);
            return Save();
        }

        public bool DeleteProductInRecipe(int recipeId, int? productId, string? productName)
        {
            var recipe = _context.Recipes
                .Include(r => r.ProductsInRecipes)
                .FirstOrDefault(x => x.Id == recipeId);

            if (recipe == null)
            {
                return false;
            }

            if(productId == null && productName != null)
            {
                var productInRecipe = recipe.ProductsInRecipes?.FirstOrDefault(x => x.ProductName == productName);
                if (productInRecipe == null)
                {
                    return false;
                }
                _context.ProductInRecipes.Remove(productInRecipe);
            }
            else
            {
                var productInRecipe = recipe.ProductsInRecipes?.FirstOrDefault(x => x.ProductId == productId);
                if (productInRecipe == null)
                {
                    return false;
                }
                _context.ProductInRecipes.Remove(productInRecipe);
            }

            if(recipe.ProductsInRecipes?.Count == 0)
            {
                recipe.ProductsInRecipes = null;
            }

            return Save();
        }

        public bool Save()
        {
            return _context.SaveChanges() >= 0 ? true : false;
        }
    }
}