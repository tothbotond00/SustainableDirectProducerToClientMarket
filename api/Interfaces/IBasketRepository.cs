using api.Models;

namespace api.Interfaces
{
    public interface IBasketRepository
    {
        public ICollection<Basket> GetBaskets();
        public Basket? GetBasketByUser(int userId);
        public bool AddProductToBasket(int userId, int productId);
        public bool UpdateQuantity(int userId, int productId, int quantity);
        public bool RemoveProductFromBasket(int userId, int productId);
        public bool SendBasket(int customerId);
        public bool Save();
    }
}