using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControleGastos.Models;
using ControleGastos.Persistence.Interfaces;
using ControleGastos.Repositories.Interfaces;

namespace ControleGastos.Repositories.Implementations
{
    public class TransacaoRepository : ITransacaoRepository
    {
        private readonly IJsonDataContext _context;

        public TransacaoRepository(IJsonDataContext context)
        {
            _context = context;
        }

        public Task AddAsync(Transacao transacao)
        {
            transacao.Id = Guid.NewGuid();
            _context.Transacoes.Add(transacao);
            return _context.SaveChangesAsync();
        }

        public Task<IEnumerable<Transacao>> GetAllAsync()
        {
            return Task.FromResult<IEnumerable<Transacao>>(_context.Transacoes.ToList());
        }

        public Task<Transacao?> GetByIdAsync(Guid id)
        {
            var t = _context.Transacoes.FirstOrDefault(x => x.Id == id);
            return Task.FromResult(t);
        }

        public Task RemoveAsync(Guid id)
        {
            var existing = _context.Transacoes.FirstOrDefault(x => x.Id == id);
            if (existing != null) _context.Transacoes.Remove(existing);
            return _context.SaveChangesAsync();
        }

        public Task<IEnumerable<Transacao>> GetByPessoaIdAsync(Guid pessoaId)
        {
            var list = _context.Transacoes.Where(x => x.PessoaId == pessoaId).ToList();
            return Task.FromResult<IEnumerable<Transacao>>(list);
        }

        public Task<IEnumerable<Transacao>> GetByCategoriaIdAsync(Guid categoriaId)
        {
            var list = _context.Transacoes.Where(x => x.CategoriaId == categoriaId).ToList();
            return Task.FromResult<IEnumerable<Transacao>>(list);
        }
    }
}
