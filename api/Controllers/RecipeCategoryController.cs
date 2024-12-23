
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeCategoryController : Controller
    {
        private IRecipeCategoryRepository _categoryRepository;

        public RecipeCategoryController(IRecipeCategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var categories = _categoryRepository.GetCategories();
            return Ok(categories);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var category = _categoryRepository.GetCategoryById(id);
            return Ok(category);
        }

        [HttpPost]
        public IActionResult Post([FromBody] RecipeCategory category)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (!_categoryRepository.CreateCategory(category)) return BadRequest();
            return Ok("Category created successfully");
        }

        [HttpPut]
        public IActionResult Put([FromBody] RecipeCategory category)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (!_categoryRepository.UpdateCategory(category)) return BadRequest();
            return Ok("Category updated successfully");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!_categoryRepository.DeleteCategory(id)) return BadRequest();
            return Ok("Category deleted successfully");
        }
    }
}