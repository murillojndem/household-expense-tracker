using ControleGastos.Persistence.Implementations;
using ControleGastos.Persistence.Interfaces;
using ControleGastos.Repositories.Implementations;
using ControleGastos.Repositories.Interfaces;
using ControleGastos.Services.Implementations;
using ControleGastos.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace ControleGastos.Api.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddSingleton<IJsonDataContext, JsonDataContext>();
            services.AddScoped<IPessoaRepository, PessoaRepository>();
            services.AddScoped<ICategoriaRepository, CategoriaRepository>();
            services.AddScoped<ITransacaoRepository, TransacaoRepository>();
            services.AddScoped<IPessoaService, PessoaService>();
            services.AddScoped<ICategoriaService, CategoriaService>();
            services.AddScoped<ITransacaoService, TransacaoService>();
            services.AddScoped<IRelatorioService, RelatorioService>();
            return services;
        }
    }
}
