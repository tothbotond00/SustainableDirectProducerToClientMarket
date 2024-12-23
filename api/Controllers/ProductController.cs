
using api.Dto;
using api.Interfaces;
using api.Models;
using api.Repository;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        private IProductRepository _productRepository;

        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var products = _productRepository.GetProducts();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var product = _productRepository.GetProductById(id);
            if (product == null) return NotFound();
            return Ok(product);
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetByUser(int userId)
        {
            var products = _productRepository.GetProductsByUser(userId);
            return Ok(products);
        }

        [HttpPost]
        public IActionResult Post([FromBody] ProductDto request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Product product = new()
            {
                Name = request.Name,
                Description = request.Description,
                Price = request.Price,
                UserId = request.UserId,
                CategoryId = request.CategoryId,
                Stock = request.Stock,
                ImageUrl = request.ImageUrl
            };
            if (!_productRepository.CreateProduct(product)) return BadRequest();
            return Ok("Product created successfully");
        }

        [HttpPut]
        public IActionResult Put([FromBody] Product product)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (!_productRepository.UpdateProduct(product)) return BadRequest();
            return Ok("Product updated successfully");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!_productRepository.DeleteProduct(id)) return BadRequest();
            return Ok("Product deleted successfully");
        }
    }
}