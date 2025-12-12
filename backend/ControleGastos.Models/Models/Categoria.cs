using System;
using ControleGastos.Models.Enums;
namespace ControleGastos.Models
{
    public class Categoria
    {
        public Guid Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public Finalidade Finalidade { get; set; }
    }
}
