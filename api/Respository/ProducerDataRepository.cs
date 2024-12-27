using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class ProducerDataRepository : IProducerDataRepository
    {
        private readonly DataContext _context;

        public ProducerDataRepository(DataContext context)
        {
            _context = context;
        }

        public bool CreateProducerData(ProducerData producerData)
        {
            _context.ProducerDatas.Add(producerData);
            return Save();
        }

        public ProducerData? GetProducerData(int userId)
        {
            var producerData = _context.ProducerDatas
                .Include(pd => pd.User)
                .FirstOrDefault(pd => pd.UserId == userId);
            if(producerData == null)
            {
                ProducerData newProducerData = new ProducerData
                {
                    UserId = userId,
                    Name = _context.Users.Find(userId)?.FullName ?? string.Empty,
                    Description = string.Empty,
                    Profession = string.Empty
                };
                CreateProducerData(newProducerData);
                return newProducerData;
            }
            return producerData;
        }

        public bool Save()
        {
            return _context.SaveChanges() > 0;
        }

        public bool UpdateProducerData(ProducerData producerData)
        {
            var data = _context.ProducerDatas.Find(producerData.UserId);
            if(data == null) return false;
            data.Name = producerData.Name;
            data.Description = producerData.Description;
            data.Profession = producerData.Profession;

            _context.ProducerDatas.Update(data);
            return Save();
        }
    }
}