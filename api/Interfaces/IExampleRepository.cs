using api.Models;

public interface IExampleRepository
{
    public ICollection<ExampleData> GetExampleData();
}