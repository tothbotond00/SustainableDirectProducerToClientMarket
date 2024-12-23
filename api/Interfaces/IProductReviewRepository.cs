using api.Models;

namespace api.Interfaces
{
    public interface IProductReviewRepository
    {
        public ICollection<ProductReview> GetReviews();
        public ICollection<ProductReview> GetReviewsByProduct(int ProductId);
        public bool CreateReview(ProductReview review);
        public bool UpdateReview(ProductReview review);
        public bool DeleteReview(int ReviewId);

    }
}