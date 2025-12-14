using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ControleGastos.Services.Interfaces;
using ControleGastos.Models;

namespace ControleGastos.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    // Controller simples para CRUD de pessoas — delega validações e lógica ao `IPessoaService`.
    public class PessoasController : ControllerBase
    {
        private readonly IPessoaService _pessoaService;

        public PessoasController(IPessoaService pessoaService)
        {
            _pessoaService = pessoaService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _pessoaService.GetAllAsync();
            return Ok(list);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Pessoa pessoa)
        {
            try
            {
                var created = await _pessoaService.CreateAsync(pessoa);
                return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var p = await _pessoaService.GetByIdAsync(id);
            if (p == null) return NotFound();
            return Ok(p);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _pessoaService.DeleteAsync(id);
            return NoContent();
        }
    }
}
