
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

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var recipe = _recipeRepository.GetRecipeById(id);
            if (recipe == null) return NotFound();
            return Ok(recipe);
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetByUserId(int userId)
        {
            var recipes = _recipeRepository.GetRecipesByUser(userId);
            return Ok(recipes);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] RecipeDto request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (request.Image == null) return BadRequest("Image is required for new recipe");

            byte[] imageData;
            using (var memoryStream = new MemoryStream())
            {
                await request.Image.CopyToAsync(memoryStream);
                imageData = memoryStream.ToArray();
            }

            Recipe recipe = new Recipe
            {
                Title = request.Title,
                Description = request.Description,
                RecipeCategoryId = request.RecipeCategoryId,
                Steps = request.Steps,
                Image = imageData,
                IsPublished = request.IsPublished,
                UserId = request.UserId
            };
            if (!_recipeRepository.CreateRecipe(recipe)) return BadRequest();
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

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromForm] RecipeDto request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var existingRecipe = _recipeRepository.GetRecipeById(id);
            if (existingRecipe == null) return NotFound();

            byte[] imageData;
            if (request.Image != null)
            {
                using var memoryStream = new MemoryStream();
                request.Image.CopyTo(memoryStream);
                imageData = memoryStream.ToArray();
            }
            else
            {
                if (existingRecipe.Image == null) return BadRequest("Recipe does not have an image, the update should contain one.");
                imageData = existingRecipe.Image;
            }

            existingRecipe.Title = request.Title;
            existingRecipe.Description = request.Description;
            existingRecipe.RecipeCategoryId = request.RecipeCategoryId;
            existingRecipe.Steps = request.Steps;
            existingRecipe.Image = imageData;
            existingRecipe.IsPublished = request.IsPublished;

            if (!_recipeRepository.UpdateRecipe(existingRecipe)) return BadRequest();
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