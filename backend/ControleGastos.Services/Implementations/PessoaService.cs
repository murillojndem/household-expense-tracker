using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControleGastos.Models;
using ControleGastos.Repositories.Interfaces;
using ControleGastos.Services.Interfaces;

namespace ControleGastos.Services.Implementations
{
    public class PessoaService : IPessoaService
    {
        private readonly IPessoaRepository _pessoaRepository;
        private readonly ITransacaoRepository _transacaoRepository;

        public PessoaService(IPessoaRepository pessoaRepository, ITransacaoRepository transacaoRepository)
        {
            _pessoaRepository = pessoaRepository;
            _transacaoRepository = transacaoRepository;
        }

        public Task<Pessoa?> GetByIdAsync(Guid id)
        {
            return _pessoaRepository.GetByIdAsync(id);
        }

        public Task<IEnumerable<Pessoa>> GetAllAsync()
        {
            return _pessoaRepository.GetAllAsync();
        }

        public async Task<Pessoa> CreateAsync(Pessoa pessoa)
        {
            if (string.IsNullOrWhiteSpace(pessoa.Nome)) throw new ArgumentException("Nome obrigatório");
            if (pessoa.Idade < 0) throw new ArgumentException("Idade inválida");
            await _pessoaRepository.AddAsync(pessoa);
            return pessoa;
        }

        public async Task DeleteAsync(Guid id)
        {
            var transacoes = await _transacaoRepository.GetByPessoaIdAsync(id);
            foreach (var t in transacoes.ToList()) await _transacaoRepository.RemoveAsync(t.Id);
            await _pessoaRepository.RemoveAsync(id);
        }
    }
}
