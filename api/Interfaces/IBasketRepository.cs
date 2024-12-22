using api.Models;

namespace api.Interfaces
{
    public interface IBasketRepository
    {
        public ICollection<Basket> GetBaskets();
        public Basket? GetBasketByUser(int userId);
        public bool AddProductToBasket(int userId, Product product);
        public bool UpdateQuantity(int userId, Product product, int quantity);
        public bool RemoveProductFromBasket(int userId, int productId);
    }
}