using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly DataContext _context;

        public OrderRepository(DataContext context)
        {
            _context = context;
        }

        public ICollection<Order> GetOrders()
        {
            return _context.Orders
                .Include(o => o.Products!)
                .ThenInclude(p => p.Product)
                .ToList();
        }

        public Order? GetOrderByUser(int userId)
        {
            return _context.Orders
                .Include(o => o.Products!)
                .ThenInclude(p => p.Product)
                .FirstOrDefault(x => x.ProducerId == userId);
        }

        public bool SendOrder(int orderId)
        {
            var order = _context.Orders
                .Include(o => o.Products)
                .FirstOrDefault(x => x.Id == orderId);

            if (order == null)
            {
                return false;
            }

            order.IsSent = true;
            order.SentAt = System.DateTime.Now;

            return true;
        }

        public bool Save()
        {
            return _context.SaveChanges() > 0;
        }
    }
}