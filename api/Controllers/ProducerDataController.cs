
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
            if(!ModelState.IsValid) return BadRequest(ModelState);

            var producer = _producerDataRepository.GetProducerData(producerData.UserId);
            if(producer == null) return NotFound();

            producer.Description = producerData.Description;
            producer.Name = producerData.Name;
            producer.Profession = producerData.Profession;
            producer.UserId = producerData.UserId;

            if(!_producerDataRepository.UpdateProducerData(producer)) return BadRequest();
            return Ok("Adatok frissítve");
        }

        [HttpPost("{id}/image")]
        public async Task<IActionResult> PostImageOne(int id, [FromForm] ImageDto request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var producerData = _producerDataRepository.GetProducerData(id);
            if(producerData == null) return NotFound();

            byte[] imageData;
            using (var memoryStream = new MemoryStream())
            {
                await request.Image.CopyToAsync(memoryStream);
                imageData = memoryStream.ToArray();
            }

            switch (request.imageID)
            {
                case 0:
                    producerData.Image_Profile = imageData;
                    break;
                case 1:
                    producerData.Image_One = imageData;
                    break;
                case 2:
                    producerData.Image_Two = imageData;
                    break;
                case 3:
                    producerData.Image_Three = imageData;
                    break;
            }
            if(!_producerDataRepository.UpdateProducerData(producerData)) return BadRequest();
            return Ok();
        }
    }
}