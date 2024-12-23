using api.Data;
using api.Interfaces;
using api.Models;

namespace api.Repository
{
    public class ProductReviewRepository : IProductReviewRepository
    {
        private readonly DataContext _context;

        public ProductReviewRepository(DataContext context)
        {
            _context = context;
        }

        public ICollection<ProductReview> GetReviews()
        {
            return _context.ProductReviews.ToList();
        }

        public ICollection<ProductReview> GetReviewsByProduct(int ProductId)
        {
            return _context.ProductReviews.Where(x => x.ProductId == ProductId).ToList();
        }

        public bool CreateReview(ProductReview review)
        {
            _context.ProductReviews.Add(review);
            return Save();
        }

        public bool UpdateReview(ProductReview review)
        {
            _context.ProductReviews.Update(review);
            return Save();
        }

        public bool DeleteReview(int ReviewId)
        {
            var review = _context.ProductReviews.FirstOrDefault(x => x.Id == ReviewId);
            if (review == null)
            {
                return false;
            }
            _context.ProductReviews.Remove(review);
            return Save();
        }

        private bool Save()
        {
            return _context.SaveChanges() >= 0;
        }
    }
}