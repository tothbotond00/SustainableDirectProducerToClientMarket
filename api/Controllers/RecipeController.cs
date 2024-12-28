
using api.Dto;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : Controller
    {
        private IRecipeRepository _recipeRepository;

        public RecipeController(IRecipeRepository recipeRepository)
        {
            _recipeRepository = recipeRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var recipes = _recipeRepository.GetRecipes();
            return Ok(recipes);
        }

        [HttpGet("{userId}")]
        public IActionResult Get(int userId)
        {
            var recipe = _recipeRepository.GetRecipeByUser(userId);
            return Ok(recipe);
        }

        [HttpPost]
        public IActionResult Post([FromBody] RecipeDto recipe)
        {
            Recipe newRecipe = new Recipe
            {
                Title = recipe.Title,
                Description = recipe.Description,
                RecipeCategoryId = recipe.RecipeCategoryId,
                Steps = recipe.Steps,
                ImageUrl = recipe.ImageUrl,
                Image = recipe.Image,
                IsPublished = recipe.IsPublished,
                UserId = recipe.UserId
            };
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (!_recipeRepository.CreateRecipe(newRecipe)) return BadRequest();
            return Ok("Recipe created successfully");
        }

        [HttpPost]
        [Route("addProduct")]
        public IActionResult AddProductToRecipe([FromBody] ProductInRecipeDto productInRecipe)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (!_recipeRepository.AddProductToRecipe(productInRecipe.RecipeId, productInRecipe.ProductId, productInRecipe.ProductName, productInRecipe.Quantity)) return BadRequest();
            return Ok("Product added to recipe successfully");
        }

        [HttpPut]
        public IActionResult Put([FromBody] RecipeDto recipe)
        {
            var recipeData = new Recipe
            {
                Title = recipe.Title,
                Description = recipe.Description,
                RecipeCategoryId = recipe.RecipeCategoryId,
                Steps = recipe.Steps,
                ImageUrl = recipe.ImageUrl,
                Image = recipe.Image,
                IsPublished = recipe.IsPublished,
                UserId = recipe.UserId
            };
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (!_recipeRepository.UpdateRecipe(recipeData)) return BadRequest();
            return Ok("Recipe updated successfully");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!_recipeRepository.DeleteRecipe(id)) return BadRequest();
            return Ok("Recipe deleted successfully");
        }

        [HttpDelete]
        [Route("deleteProduct")]
        public IActionResult DeleteProductInRecipe(int recipeId, int? productId, string? productName)
        {
            if (!_recipeRepository.DeleteProductInRecipe(recipeId, productId, productName)) return BadRequest();
            return Ok("Product deleted from recipe successfully");
        }
    }
}