using Microsoft.AspNetCore.Mvc;

namespace MenuPro.Controllers
{
    public class ManagerSummaryController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
