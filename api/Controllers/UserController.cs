using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using api.Dto;
using api.Interfaces;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private IUserRepository _userRepository;
        private IConfiguration _configuration;
        private IMapper _mapper;

        public UserController(IUserRepository userRepository, IConfiguration configuration, IMapper mapper)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            _mapper = mapper;
        }

        /// <summary>
        /// Get all users
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<User>))]
        public async Task<IActionResult> GetUser(string? email, bool? isCustomer)
        {
            if(email == null) {
                var users = await _userRepository.GetUsers();
                if (!ModelState.IsValid) return BadRequest(ModelState);
                return Ok(users);
            }
            else {
                var user = _mapper.Map<UserDto>(await _userRepository.GetUserByEmail(email, isCustomer ?? true));
                if (user == null) return NotFound();
                if (!ModelState.IsValid) return BadRequest(ModelState);
                return Ok(user);
            }


        }

        /// <summary>
        /// Register a new user
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("Signup")]
        public async Task<ActionResult<User>> Signup([FromBody] UserDto request)
        {
            var users = await _userRepository.GetUsers();
            if(users.Any(x => x.Email == request.Email && x.IsCustomer == request.IsCustomer))
            {
                return BadRequest("Email address already exists");
            }

            if(users.Any(x => x.Username == request.Username && x.IsCustomer == request.IsCustomer))
            {
                return BadRequest("Username already exists");
            }

            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            User user = new()
            {
                Username = request.Username,
                Email = request.Email,
                IsCustomer = request.IsCustomer,
                FullName = request.FullName,
                Address = request.Address,
                TaxNumber = request.TaxNumber,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Role = "User"
            };

            _userRepository.CreateUser(user);

            return Ok();
        }

        /// <summary>
        /// Login
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult<string>> Login([FromBody] UserDto request)
        {
            var users = await _userRepository.GetUsers();
            if(!users.Any(p => p.Email == request.Email && p.IsCustomer == request.IsCustomer))
            {
                return BadRequest("User not found");
            }

            User ExactUser = users.FirstOrDefault(u => u.Email == request.Email && u.IsCustomer == request.IsCustomer) ?? new User();

            if (!VerifyPasswordHash(request.Password, ExactUser.PasswordHash, ExactUser.PasswordSalt))
            {
                return BadRequest("Wrong password");
            }

            string token = CreateToken(ExactUser);

            return Ok(token);
        }


        /// <summary>
        /// Create a token
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.UserData, user.IsCustomer.ToString())
            };

            SymmetricSecurityKey key;
            var tokenValue = _configuration.GetSection("AppSettings:Token")?.Value;

            if (tokenValue == null)
            {
                throw new ArgumentNullException("Token value is null");
            }
            else
            {
                key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(tokenValue));
            }

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }


        /// <summary>
        /// Create a password hash
        /// </summary>
        /// <param name="password"></param>
        /// <param name="passwordHash"></param>
        /// <param name="passwordSalt"></param>
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA256())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        /// <summary>
        /// Verify password hash
        /// </summary>
        /// <param name="password"></param>
        /// <param name="passwordHash"></param>
        /// <param name="passwordSalt"></param>
        /// <returns></returns>
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA256(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

    }
}
