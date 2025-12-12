using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ControleGastos.Models;
using ControleGastos.Repositories.Interfaces;
using ControleGastos.Services.Interfaces;

namespace ControleGastos.Services.Implementations
{
    public class CategoriaService : ICategoriaService
    {
        private readonly ICategoriaRepository _categoriaRepository;
        private readonly ITransacaoRepository _transacaoRepository;

        public CategoriaService(ICategoriaRepository categoriaRepository, ITransacaoRepository transacaoRepository)
        {
            _categoriaRepository = categoriaRepository;
            _transacaoRepository = transacaoRepository;
        }

        public Task<Categoria?> GetByIdAsync(Guid id)
        {
            return _categoriaRepository.GetByIdAsync(id);
        }

        public Task<IEnumerable<Categoria>> GetAllAsync()
        {
            return _categoriaRepository.GetAllAsync();
        }

        public async Task<Categoria> CreateAsync(Categoria categoria)
        {
            if (string.IsNullOrWhiteSpace(categoria.Descricao)) throw new ArgumentException("Descricao obrigatoria");
            await _categoriaRepository.AddAsync(categoria);
            return categoria;
        }

        public async Task DeleteAsync(Guid id)
        {
            var transacoes = await _transacaoRepository.GetByCategoriaIdAsync(id);
            foreach (var t in transacoes.ToList()) await _transacaoRepository.RemoveAsync(t.Id);
            await _categoriaRepository.RemoveAsync(id);
        }
    }
}
