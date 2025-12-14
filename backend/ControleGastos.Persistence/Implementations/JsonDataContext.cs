using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using ControleGastos.Models;
using ControleGastos.Persistence.Interfaces;

namespace ControleGastos.Persistence.Implementations
{
    // Escolhi json como "banco de dados" para ficar mais simples e ainda assim respeitar a regra do desafio
    // de manter o banco ap�s reiniciar a aplica��o
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
            //Aqui ele verifica se o diret�rio existe. Sempre criar� um novo diret�rio quando necess�rio.
            if (!Directory.Exists(_basePath)) Directory.CreateDirectory(_basePath);
            Pessoas = LoadList<Pessoa>("pessoas.json");
            Categorias = LoadList<Categoria>("categorias.json");
            Transacoes = LoadList<Transacao>("transacoes.json");
        }

        private IList<T> LoadList<T>(string fileName)
        {
            // monta o caminho completo pro arquivo de dados
            var path = Path.Combine(_basePath, fileName);

            // se o arquivo não existir, cria um JSON de lista vazia e retorna a lista
            if (!File.Exists(path))
            {
                var empty = new List<T>();
                File.WriteAllText(path, JsonSerializer.Serialize(empty, _options));
                return empty;
            }

            // lê todo o conteúdo do arquivo
            var json = File.ReadAllText(path);

            // desserializa pro tipo esperado e garante que nunca retorna null
            var list = JsonSerializer.Deserialize<List<T>>(json, _options);
            return list ?? new List<T>();
        }

        public async Task SaveChangesAsync()
        {
            // O contexto mantém `Pessoas`, `Categorias` e `Transacoes` em memória.
            // Chamar SaveChangesAsync() regrava os três arquivos com o estado atual em memória.
            // Como o `JsonDataContext` é registrado como Singleton, a mesma instância/listas é usada pela aplicação,
            // então qualquer repositório que altere uma lista e chame SaveChangesAsync() fará a gravação dos três arquivos.
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
