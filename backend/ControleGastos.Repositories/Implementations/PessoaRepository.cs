using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControleGastos.Models;
using ControleGastos.Persistence.Interfaces;
using ControleGastos.Repositories.Interfaces;

namespace ControleGastos.Repositories.Implementations
{
    public class PessoaRepository : IPessoaRepository
    {
        private readonly IJsonDataContext _context;

        public PessoaRepository(IJsonDataContext context)
        {
            _context = context;
        }

        public Task AddAsync(Pessoa pessoa)
        {
            pessoa.Id = Guid.NewGuid();
            _context.Pessoas.Add(pessoa);
            return _context.SaveChangesAsync();
        }

        public Task<IEnumerable<Pessoa>> GetAllAsync()
        {
            return Task.FromResult<IEnumerable<Pessoa>>(_context.Pessoas.ToList());
        }

        public Task<Pessoa?> GetByIdAsync(Guid id)
        {
            var p = _context.Pessoas.FirstOrDefault(x => x.Id == id);
            return Task.FromResult(p);
        }

        public Task RemoveAsync(Guid id)
        {
            var existing = _context.Pessoas.FirstOrDefault(x => x.Id == id);
            if (existing != null) _context.Pessoas.Remove(existing);
            return _context.SaveChangesAsync();
        }
    }
}
