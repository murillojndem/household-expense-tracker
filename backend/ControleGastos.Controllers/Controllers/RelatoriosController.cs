using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ControleGastos.Services.Interfaces;

namespace ControleGastos.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RelatoriosController : ControllerBase
    {
        private readonly IRelatorioService _relatorioService;

        public RelatoriosController(IRelatorioService relatorioService)
        {
            _relatorioService = relatorioService;
        }

        [HttpGet("por-pessoa")]
        public async Task<IActionResult> TotaisPorPessoa()
        {
            var (lista, totalReceitas, totalDespesas, saldo) = await _relatorioService.TotaisPorPessoaComConsolidadoAsync();
            return Ok(new { lista, totalReceitas, totalDespesas, saldo });
        }

        [HttpGet("por-categoria")]
        public async Task<IActionResult> TotaisPorCategoria()
        {
            var (lista, totalReceitas, totalDespesas, saldo) = await _relatorioService.TotaisPorCategoriaComConsolidadoAsync();
            return Ok(new { lista, totalReceitas, totalDespesas, saldo });
        }
    }
}
