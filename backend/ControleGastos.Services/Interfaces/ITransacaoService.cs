using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ControleGastos.Models;

namespace ControleGastos.Services.Interfaces
{
    public interface ITransacaoService
    {
        Task<IEnumerable<Transacao>> GetAllAsync();
        Task<Transacao?> GetByIdAsync(Guid id);
        Task<Transacao> CreateAsync(Transacao transacao);
        Task DeleteAsync(Guid id);
    }
}
