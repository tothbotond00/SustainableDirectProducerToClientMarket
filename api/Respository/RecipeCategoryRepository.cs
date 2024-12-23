using api.Data;
using api.Interfaces;
using api.Models;

namespace api.Repository
{
    public class RecipeCategoryRepository : IRecipeCategoryRepository
    {
        private readonly DataContext _context;

        public RecipeCategoryRepository(DataContext context)
        {
            _context = context;
        }

        public ICollection<RecipeCategory> GetCategories()
        {
            return _context.RecipeCategories.ToList();
        }

        public RecipeCategory? GetCategoryById(int id)
        {
            return _context.RecipeCategories.FirstOrDefault(x => x.Id == id);
        }

        public bool CreateCategory(RecipeCategory category)
        {
            _context.RecipeCategories.Add(category);
            return Save();
        }

        public bool UpdateCategory(RecipeCategory category)
        {
            _context.RecipeCategories.Update(category);
            return Save();
        }

        public bool DeleteCategory(int id)
        {
            var category = _context.RecipeCategories.FirstOrDefault(x => x.Id == id);
            if (category == null)
            {
                return false;
            }
            _context.RecipeCategories.Remove(category);
            return Save();
        }

        public bool Save()
        {
            return _context.SaveChanges() >= 0 ? true : false;
        }
    }
}