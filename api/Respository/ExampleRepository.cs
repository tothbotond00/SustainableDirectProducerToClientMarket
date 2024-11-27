using api.Models;

namespace api.Respository
{
    public class ExampleRepository : IExampleRepository
    {
        public ExampleData GetExampleData()
        {
            return new ExampleData
            {
                Id = 1,
                Message = "Message from ExampleRepository API"
            };
        }
    }
}