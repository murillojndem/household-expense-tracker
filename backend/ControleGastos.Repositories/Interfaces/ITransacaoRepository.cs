using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ControleGastos.Models;

namespace ControleGastos.Repositories.Interfaces
{
    public interface ITransacaoRepository
    {
        Task<IEnumerable<Transacao>> GetAllAsync();
        Task<Transacao?> GetByIdAsync(Guid id);
        Task AddAsync(Transacao transacao);
        Task RemoveAsync(Guid id);
        Task<IEnumerable<Transacao>> GetByPessoaIdAsync(Guid pessoaId);
        Task<IEnumerable<Transacao>> GetByCategoriaIdAsync(Guid categoriaId);
    }
}
