
using api.Dto;
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

        [HttpPost]
        [Route("send")]
        public IActionResult SendBasket(int userId)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            if(!_basketController.SendBasket(userId)) return BadRequest();
            return Ok("Basket sent successfully");
        }

        [HttpPost]
        public IActionResult Post([FromBody] BasketDto basketDto)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            if(!_basketController.AddProductToBasket(basketDto.UserId, basketDto.ProductId, basketDto.Quantity)) return BadRequest();
            return Ok("Product added to basket successfully");
        }

        [HttpPut]
        public IActionResult Put([FromBody] BasketDto basketDto)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            if(!_basketController.UpdateQuantity(basketDto.UserId, basketDto.ProductId, basketDto.Quantity)) return BadRequest();
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