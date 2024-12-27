
using api.Dto;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProducerDataController : Controller
    {
        private IProducerDataRepository _producerDataRepository;

        public ProducerDataController(IProducerDataRepository producerDataRepository)
        {
            _producerDataRepository = producerDataRepository;
        }

        [HttpGet("{userId}")]
        public IActionResult Get(int userId)
        {
            var producerData = _producerDataRepository.GetProducerData(userId);
            return Ok(producerData);
        }

        [HttpPost]
        public IActionResult Post([FromBody] ProducerDataDto producerData)
        {
            var newProducerData = new ProducerData
            {
                Description = producerData.Description,
                Name = producerData.Name,
                Profession = producerData.Profession,
                UserId = producerData.UserId
            };

            if(!ModelState.IsValid) return BadRequest(ModelState);
            if(!_producerDataRepository.CreateProducerData(newProducerData)) return BadRequest();
            return Ok();
        }
        
        [HttpPut]
        public IActionResult Put([FromBody] ProducerDataDto producerData)
        {
            var newProducerData = new ProducerData
            {
                Description = producerData.Description,
                Name = producerData.Name,
                Profession = producerData.Profession,
                UserId = producerData.UserId
            };

            if(!ModelState.IsValid) return BadRequest(ModelState);
            if(!_producerDataRepository.UpdateProducerData(newProducerData)) return BadRequest();
            return Ok("Adatok frissítve");
        }
    }
}