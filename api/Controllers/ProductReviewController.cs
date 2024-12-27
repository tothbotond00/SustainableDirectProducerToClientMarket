
using System.Security.Claims;
using api.Dto;
using api.Interfaces;
using api.Migrations;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductReviewController : Controller
    {
        private IProductReviewRepository _reviewRepository;
        private IUserRepository _userRepository;

        public ProductReviewController(IProductReviewRepository reviewRepository,
            IUserRepository userRepository)
        {
            _reviewRepository = reviewRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var reviews = _reviewRepository.GetReviews();
            return Ok(reviews);
        }

        [HttpGet("{productId}")]
        public IActionResult Get(int productId)
        {
            var reviews = _reviewRepository.GetReviewsByProduct(productId);
            return Ok(reviews);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ProductReviewDto request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var email = User.Claims.First(claim => claim.Type == ClaimTypes.Email).Value;
            var user = await _userRepository.GetUserByEmail(email, true);
            if (user == null) return Unauthorized();
            if (!user.IsCustomer) return BadRequest("Only customers can submit reviews");

            if (_reviewRepository.GetReviewsByProduct(request.ProductId).Any(r => r.UserId == user.Id))
                return BadRequest("You have already submitted a review for this product");

            ProductReview review = new()
            {
                ProductId = request.ProductId,
                UserId = user.Id,
                Rating = request.Rating,
                Description = request.Description,
                Date = DateTime.Now,

            };
            if (!_reviewRepository.CreateReview(review)) return BadRequest();
            return Ok("Review added successfully");
        }

        [HttpPut]
        public IActionResult Put([FromBody] ProductReview review)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (!_reviewRepository.UpdateReview(review)) return BadRequest();
            return Ok("Review updated successfully");
        }

        [HttpDelete("{reviewId}")]
        public IActionResult Delete(int reviewId)
        {
            if (!_reviewRepository.DeleteReview(reviewId)) return BadRequest();
            return Ok("Review deleted successfully");
        }
    }
}