
using api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : Controller
    {
        private IOrderRepository _orderRepository;

        public OrderController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var orders = _orderRepository.GetOrders();
            return Ok(orders);
        }

        [HttpGet("{userId}")]
        public IActionResult Get(int userId)
        {
            var order = _orderRepository.GetOrderByUser(userId);
            return Ok(order);
        }

        [HttpPost]
        public IActionResult SendOrder(int orderId)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            if(!_orderRepository.SendOrder(orderId)) return BadRequest();
            return Ok("Order sent successfully");
        }        
    }
}