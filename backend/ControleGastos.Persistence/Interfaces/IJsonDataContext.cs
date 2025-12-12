using System.Collections.Generic;
using System.Threading.Tasks;
using ControleGastos.Models;

namespace ControleGastos.Persistence.Interfaces
{
    public interface IJsonDataContext
    {
        IList<Pessoa> Pessoas { get; }
        IList<Categoria> Categorias { get; }
        IList<Transacao> Transacoes { get; }
        Task SaveChangesAsync();
    }
}
