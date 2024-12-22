using api.Data;
using api.Interfaces;
using api.Models;

namespace api.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly DataContext _context;

        public CategoryRepository(DataContext context)
        {
            _context = context;
        }

        public ICollection<Category> GetCategories()
        {
            return _context.Categories.ToList();
        }

        public Category? GetCategoryById(int id)
        {
            return _context.Categories.FirstOrDefault(x => x.Id == id);
        }

        public bool CreateCategory(Category category)
        {
            _context.Categories.Add(category);
            return Save();
        }

        public bool UpdateCategory(Category category)
        {
            _context.Categories.Update(category);
            return Save();
        }

        public bool DeleteCategory(int id)
        {
            var category = _context.Categories.FirstOrDefault(x => x.Id == id);
            if (category == null)
            {
                return false;
            }
            _context.Categories.Remove(category);
            return Save();
        }

        public bool Save()
        {
            return _context.SaveChanges() >= 0 ? true : false;
        }
    }
}