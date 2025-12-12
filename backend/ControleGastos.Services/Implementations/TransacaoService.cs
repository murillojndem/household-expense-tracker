using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControleGastos.Models;
using ControleGastos.Models.Enums;
using ControleGastos.Repositories.Interfaces;
using ControleGastos.Services.Interfaces;
using System.Collections.Generic;

namespace ControleGastos.Services.Implementations
{
    public class TransacaoService : ITransacaoService
    {
        private readonly ITransacaoRepository _transacaoRepository;
        private readonly IPessoaRepository _pessoaRepository;
        private readonly ICategoriaRepository _categoriaRepository;

        public TransacaoService(ITransacaoRepository transacaoRepository, IPessoaRepository pessoaRepository, ICategoriaRepository categoriaRepository)
        {
            _transacaoRepository = transacaoRepository;
            _pessoaRepository = pessoaRepository;
            _categoriaRepository = categoriaRepository;
        }

        public Task<Transacao?> GetByIdAsync(Guid id)
        {
            return _transacaoRepository.GetByIdAsync(id);
        }

        public Task<IEnumerable<Transacao>> GetAllAsync()
        {
            return _transacaoRepository.GetAllAsync();
        }

        public async Task<Transacao> CreateAsync(Transacao transacao)
        {
            if (transacao.Valor <= 0) throw new ArgumentException("Valor deve ser positivo");
            var pessoa = await _pessoaRepository.GetByIdAsync(transacao.PessoaId);
            if (pessoa == null) throw new ArgumentException("Pessoa nao encontrada");
            if (pessoa.Idade < 18 && transacao.Tipo != TipoTransacao.Despesa) throw new InvalidOperationException("Menores de 18 anos so podem registrar despesas");
            var categoria = await _categoriaRepository.GetByIdAsync(transacao.CategoriaId);
            if (categoria == null) throw new ArgumentException("Categoria nao encontrada");
            if (transacao.Tipo == TipoTransacao.Despesa && categoria.Finalidade == Finalidade.Receita) throw new InvalidOperationException("Categoria incompatível: despesa nao pode usar categoria apenas receita");
            if (transacao.Tipo == TipoTransacao.Receita && categoria.Finalidade == Finalidade.Despesa) throw new InvalidOperationException("Categoria incompatível: receita nao pode usar categoria apenas despesa");
            await _transacaoRepository.AddAsync(transacao);
            return transacao;
        }

        public async Task DeleteAsync(Guid id)
        {
            var existing = await _transacaoRepository.GetByIdAsync(id);
            if (existing == null) throw new KeyNotFoundException("Transacao nao encontrada");
            await _transacaoRepository.RemoveAsync(id);
        }
    }
}
