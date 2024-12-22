using api.Models;

namespace api.Interfaces
{

    public interface ICategoryRepository
    {
        public ICollection<Category> GetCategories(); // return all categories
        public Category? GetCategoryById(int id); // return category by id
        public bool CreateCategory(Category category); // create a new category
        public bool UpdateCategory(Category category); // update a category
        public bool DeleteCategory(int id); // delete a category
    }
}