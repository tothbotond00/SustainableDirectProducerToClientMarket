using api.Data;
using api.Interfaces;
using api.Models;

namespace api.Repository
{
    public class RecipeReviewRepository : IRecipeReviewRepository
    {
        private readonly DataContext _context;

        public RecipeReviewRepository(DataContext context)
        {
            _context = context;
        }

        public ICollection<RecipeReview> GetReviews()
        {
            return _context.RecipeReviews.ToList();
        }

        public ICollection<RecipeReview> GetReviewsByProduct(int RecipeId)
        {
            return _context.RecipeReviews.Where(x => x.RecipeId == RecipeId).ToList();
        }

        public bool CreateReview(RecipeReview review)
        {
            _context.RecipeReviews.Add(review);
            return Save();
        }

        public bool UpdateReview(RecipeReview review)
        {
            _context.RecipeReviews.Update(review);
            return Save();
        }

        public bool DeleteReview(int ReviewId)
        {
            var review = _context.RecipeReviews.FirstOrDefault(x => x.Id == ReviewId);
            if (review == null)
            {
                return false;
            }
            _context.RecipeReviews.Remove(review);
            return Save();
        }

        private bool Save()
        {
            return _context.SaveChanges() >= 0;
        }
    }
}