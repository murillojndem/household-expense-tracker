using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using ControleGastos.Models;
using ControleGastos.Persistence.Interfaces;

namespace ControleGastos.Persistence.Implementations
{
    public class JsonDataContext : IJsonDataContext
    {
        private readonly string _basePath;
        private readonly JsonSerializerOptions _options = new JsonSerializerOptions { WriteIndented = true };

        public IList<Pessoa> Pessoas { get; private set; }
        public IList<Categoria> Categorias { get; private set; }
        public IList<Transacao> Transacoes { get; private set; }

        public JsonDataContext()
        {
            var currentDir = Directory.GetCurrentDirectory();
            _basePath = Path.Combine(currentDir, "..", "DataFiles");
            _basePath = Path.GetFullPath(_basePath);
            if (!Directory.Exists(_basePath)) Directory.CreateDirectory(_basePath);
            Pessoas = LoadList<Pessoa>("pessoas.json");
            Categorias = LoadList<Categoria>("categorias.json");
            Transacoes = LoadList<Transacao>("transacoes.json");
        }

        private IList<T> LoadList<T>(string fileName)
        {
            var path = Path.Combine(_basePath, fileName);
            if (!File.Exists(path))
            {
                var empty = new List<T>();
                File.WriteAllText(path, JsonSerializer.Serialize(empty, _options));
                return empty;
            }
            var json = File.ReadAllText(path);
            var list = JsonSerializer.Deserialize<List<T>>(json, _options);
            return list ?? new List<T>();
        }

        public async Task SaveChangesAsync()
        {
            await WriteList(Pessoas, "pessoas.json");
            await WriteList(Categorias, "categorias.json");
            await WriteList(Transacoes, "transacoes.json");
        }

        private async Task WriteList<T>(IList<T> list, string fileName)
        {
            var path = Path.Combine(_basePath, fileName);
            var tmp = path + ".tmp";
            var json = JsonSerializer.Serialize(list, _options);
            await File.WriteAllTextAsync(tmp, json);
            if (File.Exists(path)) File.Delete(path);
            File.Move(tmp, path);
        }
    }
}
