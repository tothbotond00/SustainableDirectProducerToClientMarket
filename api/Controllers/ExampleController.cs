
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
            var datas = _exampleRepository.GetExampleData();
            return Ok(datas);
        }
    }
}