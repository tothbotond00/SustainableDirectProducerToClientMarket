using api.Data;
using api.Interfaces;
using api.Models;

namespace api.Repository
{
    public class BasketRepository : IBasketRepository
    {
        private readonly DataContext _context;

        public BasketRepository(DataContext context)
        {
            _context = context;
        }

        public ICollection<Basket> GetBaskets()
        {
            return _context.Baskets.ToList();
        }

        public Basket? GetBasketByUser(int userId)
        {
            return _context.Baskets.FirstOrDefault(x => x.UserId == userId);
        }

        public bool AddProductToBasket(int userId, Product product)
        {
            var basket = _context.Baskets.FirstOrDefault(x => x.UserId == userId);
            if (basket == null)
            {
                return false;
            }
            if (basket.ProductsInBasket == null)
            {
                basket.ProductsInBasket = new List<ProductInBasket>();
            }

            basket.ProductsInBasket.Add(new ProductInBasket
            {
                Product = product,
                Quantity = 1
            });

            return Save();
        }

        public bool UpdateQuantity(int userId, Product product, int quantity)
        {
            var basket = _context.Baskets.FirstOrDefault(x => x.UserId == userId);
            if (basket == null)
            {
                return false;
            }
            var productInBasket = basket.ProductsInBasket?.FirstOrDefault(x => x.ProductId == product.Id);
            if (productInBasket == null)
            {
                return false;
            }
            productInBasket.Quantity = quantity;
            return Save();
        }

        public bool RemoveProductFromBasket(int userId, int productId)
        {
            var basket = _context.Baskets.FirstOrDefault(x => x.UserId == userId);
            if (basket == null)
            {
                return false;
            }
            var productInBasket = basket.ProductsInBasket?.FirstOrDefault(x => x.ProductId == productId);
            if (productInBasket == null)
            {
                return false;
            }
            basket.ProductsInBasket?.Remove(productInBasket);
            return Save();
        }

        public bool Save()
        {
            return _context.SaveChanges() >= 0 ? true : false;
        }
    }
}