using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControleGastos.Models;
using ControleGastos.Repositories.Interfaces;
using ControleGastos.Services.Interfaces;

namespace ControleGastos.Services.Implementations
{
    public class RelatorioService : IRelatorioService
    {
        private readonly IPessoaRepository _pessoaRepository;
        private readonly ITransacaoRepository _transacaoRepository;
        private readonly ICategoriaRepository _categoriaRepository;

        public RelatorioService(IPessoaRepository pessoaRepository, ITransacaoRepository transacaoRepository, ICategoriaRepository categoriaRepository)
        {
            _pessoaRepository = pessoaRepository;
            _transacaoRepository = transacaoRepository;
            _categoriaRepository = categoriaRepository;
        }

        public async Task<IEnumerable<TotaisPorPessoa>> TotaisPorPessoaAsync()
        {
            var pessoas = (await _pessoaRepository.GetAllAsync()).ToList();
            var resultado = new List<TotaisPorPessoa>();
            foreach (var p in pessoas)
            {
                var trans = (await _transacaoRepository.GetByPessoaIdAsync(p.Id)).ToList();
                var receitas = trans.Where(t => t.Tipo == Models.Enums.TipoTransacao.Receita).Sum(t => t.Valor);
                var despesas = trans.Where(t => t.Tipo == Models.Enums.TipoTransacao.Despesa).Sum(t => t.Valor);
                resultado.Add(new TotaisPorPessoa { Pessoa = p, TotalReceitas = receitas, TotalDespesas = despesas, Saldo = receitas - despesas });
            }
            return resultado;
        }

        public async Task<(IEnumerable<TotaisPorPessoa> Lista, decimal TotalReceitas, decimal TotalDespesas, decimal Saldo)> TotaisPorPessoaComConsolidadoAsync()
        {
            var lista = (await TotaisPorPessoaAsync()).ToList();
            var totalReceitas = lista.Sum(x => x.TotalReceitas);
            var totalDespesas = lista.Sum(x => x.TotalDespesas);
            return (lista, totalReceitas, totalDespesas, totalReceitas - totalDespesas);
        }

        public async Task<IEnumerable<TotaisPorCategoria>> TotaisPorCategoriaAsync()
        {
            var categorias = (await _categoriaRepository.GetAllAsync()).ToList();
            var resultado = new List<TotaisPorCategoria>();
            foreach (var c in categorias)
            {
                var trans = (await _transacaoRepository.GetByCategoriaIdAsync(c.Id)).ToList();
                var receitas = trans.Where(t => t.Tipo == Models.Enums.TipoTransacao.Receita).Sum(t => t.Valor);
                var despesas = trans.Where(t => t.Tipo == Models.Enums.TipoTransacao.Despesa).Sum(t => t.Valor);
                resultado.Add(new TotaisPorCategoria { Categoria = c, TotalReceitas = receitas, TotalDespesas = despesas, Saldo = receitas - despesas });
            }
            return resultado;
        }

        public async Task<(IEnumerable<TotaisPorCategoria> Lista, decimal TotalReceitas, decimal TotalDespesas, decimal Saldo)> TotaisPorCategoriaComConsolidadoAsync()
        {
            var lista = (await TotaisPorCategoriaAsync()).ToList();
            var totalReceitas = lista.Sum(x => x.TotalReceitas);
            var totalDespesas = lista.Sum(x => x.TotalDespesas);
            return (lista, totalReceitas, totalDespesas, totalReceitas - totalDespesas);
        }
    }
}
