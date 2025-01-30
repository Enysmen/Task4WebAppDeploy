using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.UI.Services;

namespace Task4_1.Services
{
    public class NoOpEmailSender : IEmailSender
    {
        public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            
            return Task.CompletedTask;
        }
    }
}
