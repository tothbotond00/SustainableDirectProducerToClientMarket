using api.Models;

namespace api.Interfaces
{
    public interface IProducerDataRepository
    {
        public ProducerData? GetProducerData(int userId); // return producer data by user id
        public bool CreateProducerData(ProducerData producerData); // create producer data
        public bool UpdateProducerData(ProducerData producerData); // update producer data
        public bool Save();
    }
}