using api.Models;

namespace api.Interfaces
{
    public interface IOrderRepository
    {
        public ICollection<Order> GetOrders(); // return all orders
        public Order? GetOrderByUser(int userId); // return order by id
        public bool SendOrder(int orderId); // send order
        bool Save();
    }
}