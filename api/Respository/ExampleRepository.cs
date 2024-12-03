using api.Data;
using api.Models;

namespace api.Respository
{
    public class ExampleRepository : IExampleRepository
    {
        private DataContext _context;

        public ExampleRepository(DataContext context)
        {
            _context = context;
        }

        public ICollection<ExampleData> GetExampleData()
        {
            return _context.ExampleDatas.ToList();
        }
    }
}