using api.Models;

namespace api.Interfaces
{
    public interface IProductRepository
    {
        public ICollection<Product> GetProducts(); // return all products
        public ICollection<Product> GetProductsByUser(int UserId); // return all products by user
        public Product? GetProductById(int ProductId); // return product by id
        bool CreateProduct(Product product); // create a new product
        bool UpdateProduct(Product product); // update a product
        bool DeleteProduct(int ProductId); // delete a product
    }
}