using System;
namespace ControleGastos.Models
{
    public class Pessoa
    {
        public Guid Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public int Idade { get; set; }
    }
}
