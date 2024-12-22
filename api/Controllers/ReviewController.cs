
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : Controller
    {
        private IReviewRepository _reviewRepository;

        public ReviewController(IReviewRepository reviewRepository)
        {
            _reviewRepository = reviewRepository;
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

        [HttpPost]
        public IActionResult Post([FromBody] Review review)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (!_reviewRepository.CreateReview(review)) return BadRequest();
            return Ok("Review added successfully");
        }

        [HttpPut]
        public IActionResult Put([FromBody] Review review)
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