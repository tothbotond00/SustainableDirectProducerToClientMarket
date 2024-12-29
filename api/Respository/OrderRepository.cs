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

        public ICollection<Order>? GetOrderByUser(int userId)
        {
            // return _context.Orders
            //     .Include(o => o.Products!)
            //     .ThenInclude(p => p.Product)
            //     .FirstOrDefault(x => x.ProducerId == userId)
            //     .Products;

            return _context.Orders
                .Include(o => o.Products!)
                .ThenInclude(p => p.Product)
                .Include(o => o.Customer)
                .Where(x => x.ProducerId == userId)
                .ToList();
            
        }

        public bool SendOrder(int orderId)
        {
            var order = _context.Orders
                .Include(o => o.Products!)
                .ThenInclude(p => p.Product)
                .FirstOrDefault(x => x.Id == orderId);

            if (order == null)
            {
                return false;
            }

            order.IsSent = true;
            order.SentAt = System.DateTime.Now;

            //lower stock
            if(order.Products != null)
            {
                foreach (var product in order.Products)
                {
                    product.Product!.Stock -= product.Quantity;
                }
            }

            _context.Orders.Update(order);

            return Save();
        }

        public bool Save()
        {
            return _context.SaveChanges() > 0;
        }
    }
}