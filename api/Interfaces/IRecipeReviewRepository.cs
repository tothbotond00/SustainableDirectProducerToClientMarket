using api.Models;

namespace api.Interfaces
{
    public interface IRecipeReviewRepository
    {
        public ICollection<RecipeReview> GetReviews();
        public ICollection<RecipeReview> GetReviewsByProduct(int RecipeId);
        public bool CreateReview(RecipeReview review);
        public bool UpdateReview(RecipeReview review);
        public bool DeleteReview(int ReviewId);

    }
}