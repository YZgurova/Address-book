using Microsoft.AspNetCore.Mvc;
using RandomUser.Services;
using RandomUser.Models;
using System.Runtime.InteropServices;

namespace RandomUser.Controllers
{
    [Route("api/random")]
    [ApiController]
    public class RandomUserControler : ControllerBase
    {
        private readonly IRandomUserService _userService;

        public RandomUserControler(IRandomUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("")]
        public async Task<ActionResult<Result>> GetRandomUsers([FromQuery] int page, [FromQuery] int results)
        {
            var user = await _userService.GetRandomUsersAsync(page, results);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpGet("search")]
        public async Task<ActionResult<Result>> GetRandomUsers([FromQuery] int page, 
                                                               [FromQuery] int results, 
                                                               [FromQuery] List<string>? nationalities,
                                                               [FromQuery] string? gender)
        {
             var user = await _userService.GetRandomUsersByPropAsync(page, results, gender, nationalities);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
    }
}
