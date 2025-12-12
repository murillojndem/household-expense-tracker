using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ControleGastos.Models;

namespace ControleGastos.Services.Interfaces
{
    public interface IPessoaService
    {
        Task<IEnumerable<Pessoa>> GetAllAsync();
        Task<Pessoa?> GetByIdAsync(Guid id);
        Task<Pessoa> CreateAsync(Pessoa pessoa);
        Task DeleteAsync(Guid id);
    }
}
