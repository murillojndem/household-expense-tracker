using System.Collections.Generic;
using System.Threading.Tasks;
using ControleGastos.Models;

namespace ControleGastos.Services.Interfaces
{
    public class TotaisPorPessoa
    {
        public Pessoa Pessoa { get; set; } = new Pessoa();
        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }
        public decimal Saldo { get; set; }
    }

    public class TotaisPorCategoria
    {
        public Categoria Categoria { get; set; } = new Categoria();
        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }
        public decimal Saldo { get; set; }
    }

    public interface IRelatorioService
    {
        Task<IEnumerable<TotaisPorPessoa>> TotaisPorPessoaAsync();
        Task<(IEnumerable<TotaisPorPessoa> Lista, decimal TotalReceitas, decimal TotalDespesas, decimal Saldo)> TotaisPorPessoaComConsolidadoAsync();
        Task<IEnumerable<TotaisPorCategoria>> TotaisPorCategoriaAsync();
        Task<(IEnumerable<TotaisPorCategoria> Lista, decimal TotalReceitas, decimal TotalDespesas, decimal Saldo)> TotaisPorCategoriaComConsolidadoAsync();
    }
}
