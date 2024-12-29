
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
        public async Task<IActionResult> Post([FromForm] ProductDto request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (request.Image == null) return BadRequest("Image is required for new product");

            byte[] imageData;
            using (var memoryStream = new MemoryStream())
            {
                await request.Image.CopyToAsync(memoryStream);
                imageData = memoryStream.ToArray();
            }

            Product product = new()
            {
                Name = request.Name,
                Description = request.Description,
                Price = request.Price,
                UserId = request.UserId,
                CategoryId = request.CategoryId,
                Stock = request.Stock,
                Unit = request.Unit,
                Image = imageData
            };
            if (!_productRepository.CreateProduct(product)) return BadRequest();
            return Ok("Product created successfully");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromForm] ProductDto request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var existingProduct = _productRepository.GetProductById(id);
            if (existingProduct == null) return NotFound();

            byte[] imageData;
            if (request.Image != null)
            {
                using var memoryStream = new MemoryStream();
                await request.Image.CopyToAsync(memoryStream);
                imageData = memoryStream.ToArray();
            }
            else
            {
                if (existingProduct.Image == null) return BadRequest("Product doesn't have an image, the update should contain one.");
                imageData = existingProduct.Image;
            }

            existingProduct.Name = request.Name;
            existingProduct.Description = request.Description;
            existingProduct.Price = request.Price;
            existingProduct.UserId = request.UserId;
            existingProduct.CategoryId = request.CategoryId;
            existingProduct.Stock = request.Stock;
            existingProduct.Unit = request.Unit;
            existingProduct.Image = imageData;

            if (!_productRepository.UpdateProduct(existingProduct)) return BadRequest();
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