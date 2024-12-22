using api.Data;
using api.Interfaces;
using api.Models;

namespace api.Repository
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly DataContext _context;

        public ReviewRepository(DataContext context)
        {
            _context = context;
        }

        public ICollection<Review> GetReviews()
        {
            return _context.Reviews.ToList();
        }

        public ICollection<Review> GetReviewsByProduct(int ProductId)
        {
            return _context.Reviews.Where(x => x.ProductId == ProductId).ToList();
        }

        public bool CreateReview(Review review)
        {
            _context.Reviews.Add(review);
            return Save();
        }

        public bool UpdateReview(Review review)
        {
            _context.Reviews.Update(review);
            return Save();
        }

        public bool DeleteReview(int ReviewId)
        {
            var review = _context.Reviews.FirstOrDefault(x => x.Id == ReviewId);
            if (review == null)
            {
                return false;
            }
            _context.Reviews.Remove(review);
            return Save();
        }

        private bool Save()
        {
            return _context.SaveChanges() >= 0;
        }
    }
}