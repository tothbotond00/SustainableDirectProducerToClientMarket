using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

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

        public bool AddProductToBasket(int userId, int productId)
        {
            var basket = _context.Baskets
                .Include(b => b.ProductsInBasket)
                .FirstOrDefault(x => x.UserId == userId);

            if (basket == null)
            {
                basket = new Basket { UserId = userId };
                _context.Baskets.Add(basket);
            }

            var productInBasket = basket.ProductsInBasket?.FirstOrDefault(x => x.ProductId == productId);
            if (productInBasket == null)
            {
                basket.ProductsInBasket = new List<ProductInBasket>
                {
                    new ProductInBasket { ProductId = productId, Quantity = 1 }
                };
            }
            else
            {
                productInBasket.Quantity++;
            }

            return Save();
        }


        public bool UpdateQuantity(int userId, int productId, int quantity)
        {
            var basket = _context.Baskets
                .Include(b => b.ProductsInBasket)
                .FirstOrDefault(x => x.UserId == userId);

            if (basket == null)
            {
                return false;
            }

            var productInBasket = basket.ProductsInBasket?.FirstOrDefault(x => x.ProductId == productId);
            if (productInBasket == null)
            {
                return false;
            }

            productInBasket.Quantity = quantity;
            return Save();
        }

        public bool RemoveProductFromBasket(int userId, int productId)
        {
            var basket = _context.Baskets
                .Include(b => b.ProductsInBasket)
                .FirstOrDefault(x => x.UserId == userId);

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