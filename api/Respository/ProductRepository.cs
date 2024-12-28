using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _context;

        public ProductRepository(DataContext context)
        {
            _context = context;
        }

        public bool CreateProduct(Product product)
        {
            _context.Products.Add(product);
            return Save();
        }

        public bool DeleteProduct(int ProductId)
        {
            var product = GetProductById(ProductId);
            if (product == null) return false;
            _context.Products.Remove(product);
            return Save();
        }

        public Product? GetProductById(int ProductId)
        {
            return _context.Products
                .Include(p => p.Reviews)
                .Include(p => p.User)
                .FirstOrDefault(p => p.Id == ProductId);
        }

        public ICollection<Product> GetProducts()
        {
            return _context.Products
                .Include(p => p.Reviews)
                .Include(p => p.User)
                .ToList();
        }

        public ICollection<Product> GetProductsByUser(int UserId)
        {
            return _context.Products
                .Where(p => p.UserId == UserId)
                .Include(p => p.Reviews)
                .Include(p => p.User)
                .ToList();
        }

        public bool UpdateProduct(Product product)
        {
            _context.Products.Update(product);
            return Save();
        }

        public bool Save()
        {
            return _context.SaveChanges() >= 0 ? true : false;
        }
    }

}