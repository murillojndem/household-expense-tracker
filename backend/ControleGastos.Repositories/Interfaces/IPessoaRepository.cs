using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ControleGastos.Models;

namespace ControleGastos.Repositories.Interfaces
{
    public interface IPessoaRepository
    {
        Task<IEnumerable<Pessoa>> GetAllAsync();
        Task<Pessoa?> GetByIdAsync(Guid id);
        Task AddAsync(Pessoa pessoa);
        Task RemoveAsync(Guid id);
    }
}
