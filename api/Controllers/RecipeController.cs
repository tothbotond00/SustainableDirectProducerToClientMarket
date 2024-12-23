
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
            var recipe = _recipeRepository.GetRecipeByUser(id);
            return Ok(recipe);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Recipe recipe)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (!_recipeRepository.CreateRecipe(recipe)) return BadRequest();
            return Ok("Recipe created successfully");
        }

        [HttpPost]
        [Route("addProduct")]
        public IActionResult AddProductToRecipe([FromBody] int recipeId, int productId)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (!_recipeRepository.AddProductToRecipe(recipeId, productId)) return BadRequest();
            return Ok("Product added to recipe successfully");
        }

        [HttpPut]
        public IActionResult Put([FromBody] Recipe recipe)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (!_recipeRepository.UpdateRecipe(recipe)) return BadRequest();
            return Ok("Recipe updated successfully");
        }

        [HttpPut]
        [Route("updateProduct")]
        public IActionResult UpdateProductInRecipe([FromBody] ProductInRecipe productInRecipe)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (!_recipeRepository.UpdateProductInRecipe(productInRecipe)) return BadRequest();
            return Ok("Product in recipe updated successfully");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!_recipeRepository.DeleteRecipe(id)) return BadRequest();
            return Ok("Recipe deleted successfully");
        }

        [HttpDelete]
        [Route("deleteProduct")]
        public IActionResult DeleteProductInRecipe([FromBody] int recipeId, int productId)
        {
            if (!_recipeRepository.DeleteProductInRecipe(recipeId, productId)) return BadRequest();
            return Ok("Product deleted from recipe successfully");
        }
    }
}