using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using Task4_1.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Task4_1.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public UsersController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = _userManager.Users.ToList();
            return Ok(users);
        }

        [HttpPost("block")]
        public async Task<IActionResult> BlockUser([FromBody] string[] userIds)
        {
            bool selfBlocked = false;

            foreach (var id in userIds)
            {
                var user = await _userManager.FindByIdAsync(id);
                if (user == null)
                {
                    continue;
                }

                user.IsBlocked = true;
                await _userManager.UpdateAsync(user);

                // Проверка, заблокировал ли пользователь сам себя
                if (User.Identity.Name == user.UserName)
                {
                    selfBlocked = true;
                }
            }

            if (selfBlocked)
            {
                await _signInManager.SignOutAsync();
                return RedirectToPage("/Account/Login", new { area = "Identity" });
            }

            return Ok();
        }

        [HttpPost("unblock/{id}")]
        public async Task<IActionResult> UnblockUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            user.IsBlocked = false;
            await _userManager.UpdateAsync(user);

            return Ok();
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteUsers([FromBody] string[] userIds)
        {
            bool selfDeleted = false;

            foreach (var id in userIds)
            {
                var user = await _userManager.FindByIdAsync(id);
                if (user == null)
                {
                    continue;
                }

                var result = await _userManager.DeleteAsync(user);
                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors);
                }

                // Проверка, удалил ли пользователь сам себя
                if (User.Identity.Name == user.UserName)
                {
                    selfDeleted = true;
                }
            }

            if (selfDeleted)
            {
                await _signInManager.SignOutAsync();
                return RedirectToPage("/Account/Login", new { area = "Identity" });
            }

            return Ok();
        }
    }
}



















//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Identity;
//using System.Threading.Tasks;
//using Task4_1.Models;
//using Microsoft.AspNetCore.Authentication;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc.RazorPages;

//namespace Task4_1.Controllers
//{
//    [Authorize]
//    [Route("api/[controller]")]
//    [ApiController]
//    public class UsersController : ControllerBase
//    {

//        private readonly UserManager<ApplicationUser> _userManager;
//        private readonly SignInManager<ApplicationUser> _signInManager;

//        public UsersController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
//        {
//            _userManager = userManager;
//            _signInManager = signInManager;
//        }

//        [HttpPost("block/{id}")]
//        public async Task<IActionResult> BlockUser(string id)
//        {
//            var user = await _userManager.FindByIdAsync(id);
//            if (user == null)
//            {
//                return NotFound();
//            }

//            user.IsBlocked = true;
//            await _userManager.UpdateAsync(user);


//            if (User.Identity.Name == user.UserName)
//            {
//                await _signInManager.SignOutAsync();
//                return RedirectToPage("/Account/Login", new { area = "Identity" });
//            }

//            return Ok();
//        }

//        [HttpPost("unblock/{id}")]
//        public async Task<IActionResult> UnblockUser(string id)
//        {
//            var user = await _userManager.FindByIdAsync(id);
//            if (user == null)
//            {
//                return NotFound();
//            }

//            user.IsBlocked = false;
//            await _userManager.UpdateAsync(user);

//            return Ok();
//        }

//        [HttpDelete("delete/{id}")]
//        public async Task<IActionResult> DeleteUser(string id)
//        {
//            var user = await _userManager.FindByIdAsync(id);
//            if (user == null)
//            {
//                return NotFound();
//            }

//            var result = await _userManager.DeleteAsync(user);
//            if (!result.Succeeded)
//            {
//                return BadRequest(result.Errors);
//            }


//            if (User.Identity.Name == user.UserName)
//            {
//                await _signInManager.SignOutAsync();
//                return RedirectToPage("/Account/Login", new { area = "Identity" });
//            }

//            return Ok();
//        }
//    }
//}