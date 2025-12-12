using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControleGastos.Models;
using ControleGastos.Persistence.Interfaces;
using ControleGastos.Repositories.Interfaces;

namespace ControleGastos.Repositories.Implementations
{
    public class CategoriaRepository : ICategoriaRepository
    {
        private readonly IJsonDataContext _context;

        public CategoriaRepository(IJsonDataContext context)
        {
            _context = context;
        }

        public Task AddAsync(Categoria categoria)
        {
            categoria.Id = Guid.NewGuid();
            _context.Categorias.Add(categoria);
            return _context.SaveChangesAsync();
        }

        public Task<IEnumerable<Categoria>> GetAllAsync()
        {
            return Task.FromResult<IEnumerable<Categoria>>(_context.Categorias.ToList());
        }

        public Task<Categoria?> GetByIdAsync(Guid id)
        {
            var c = _context.Categorias.FirstOrDefault(x => x.Id == id);
            return Task.FromResult(c);
        }

        public Task RemoveAsync(Guid id)
        {
            var existing = _context.Categorias.FirstOrDefault(x => x.Id == id);
            if (existing != null) _context.Categorias.Remove(existing);
            return _context.SaveChangesAsync();
        }
    }
}
