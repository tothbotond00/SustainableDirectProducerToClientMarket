
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : Controller
    {
        private IBasketRepository _basketController;

        public BasketController(IBasketRepository basketRepository)
        {
            _basketController = basketRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var baskets = _basketController.GetBaskets();
            return Ok(baskets);
        }

        [HttpGet("{userId}")]
        public IActionResult Get(int userId)
        {
            var basket = _basketController.GetBasketByUser(userId);
            return Ok(basket);
        }

        [HttpPost("{userId}")]
        public IActionResult Post(int userId, [FromBody] Product product)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            if(!_basketController.AddProductToBasket(userId, product)) return BadRequest();
            return Ok("Product added to basket successfully");

        }

        [HttpPut("{userId}")]
        public IActionResult Put(int userId, [FromBody] Product product, int quantity)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            if(!_basketController.UpdateQuantity(userId, product, quantity)) return BadRequest();
            return Ok("Quantity updated successfully");
        }

        [HttpDelete("{userId}/{productId}")]
        public IActionResult Delete(int userId, int productId)
        {
            if(!_basketController.RemoveProductFromBasket(userId, productId)) return BadRequest();
            return Ok("Product removed from basket successfully");
        }
    }
}