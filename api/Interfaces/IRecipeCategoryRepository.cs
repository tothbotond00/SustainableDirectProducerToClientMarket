using api.Models;

namespace api.Interfaces
{

    public interface IRecipeCategoryRepository
    {
        public ICollection<RecipeCategory> GetCategories(); // return all categories
        public RecipeCategory? GetCategoryById(int id); // return category by id
        public bool CreateCategory(RecipeCategory category); // create a new category
        public bool UpdateCategory(RecipeCategory category); // update a category
        public bool DeleteCategory(int id); // delete a category
    }
}