
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExampleDataController : Controller
    {
        private IExampleRepository _exampleRepository;

        public ExampleDataController(IExampleRepository exampleRepository)
        {
            _exampleRepository = exampleRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_exampleRepository.GetExampleData());
        }
    }
}