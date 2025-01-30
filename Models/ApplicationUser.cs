using System.ComponentModel.DataAnnotations;

using Microsoft.AspNetCore.Identity;

namespace Task4_1.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        public string RoleCompany { get; set; }

        public DateTime? LastLoginTime { get; set; }

        public bool IsBlocked { get; set; }
    }
}
