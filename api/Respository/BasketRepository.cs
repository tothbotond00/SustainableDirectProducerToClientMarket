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
            return _context.Baskets
                .Include(b => b.ProductsInBasket)
                .ToList();
        }

        public Basket? GetBasketByUser(int userId)
        {
            var basket = _context.Baskets
                .Include(b => b.ProductsInBasket)
                .FirstOrDefault(x => x.UserId == userId);

            return basket;
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

            if(basket.ProductsInBasket == null)
            {
                basket.ProductsInBasket = new List<ProductInBasket>();
            }

            var productInBasket = basket.ProductsInBasket?.FirstOrDefault(x => x.ProductId == productId);
            if (productInBasket == null)
            {
                productInBasket = new ProductInBasket
                {
                    ProductId = productId,
                    Quantity = 1,
                    TotalPrice = _context.Products.FirstOrDefault(x => x.Id == productId)?.Price ?? 0
                };
                basket.ProductsInBasket?.Add(productInBasket);
            }
            else
            {
                productInBasket.Quantity++;
                productInBasket.TotalPrice = productInBasket.Quantity * (_context.Products.FirstOrDefault(x => x.Id == productId)?.Price ?? 0);
            }

            basket.TotalPrice = basket.ProductsInBasket?.Sum(x => x.TotalPrice) ?? 0;

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
            productInBasket.TotalPrice = productInBasket.Quantity * (_context.Products.FirstOrDefault(x => x.Id == productId)?.Price ?? 0);

            basket.TotalPrice = basket.ProductsInBasket?.Sum(x => x.TotalPrice) ?? 0;
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

            _context.ProductInBaskets.Remove(productInBasket);

            if(basket.ProductsInBasket?.Count == 0)
            {
                _context.Baskets.Remove(basket);
            }

            productInBasket.TotalPrice = 0;
            basket.TotalPrice = basket.ProductsInBasket?.Sum(x => x.TotalPrice) ?? 0;
            
            return Save();
        }

        public bool Save()
        {
            return _context.SaveChanges() >= 0 ? true : false;
        }
    }
}