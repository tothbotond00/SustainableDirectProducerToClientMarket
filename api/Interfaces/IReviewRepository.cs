using api.Models;

namespace api.Interfaces
{
    public interface IReviewRepository
    {
        public ICollection<Review> GetReviews();
        public ICollection<Review> GetReviewsByProduct(int ProductId);
        public bool CreateReview(Review review);
        public bool UpdateReview(Review review);
        public bool DeleteReview(int ReviewId);

    }
}