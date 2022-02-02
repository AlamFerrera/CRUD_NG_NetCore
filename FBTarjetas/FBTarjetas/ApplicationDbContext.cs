using FBTarjetas.Models;
using Microsoft.EntityFrameworkCore;

namespace FBTarjetas
{
    public class ApplicationDbContext:DbContext
    {
        public DbSet<TarjetaCredito>TarjetaCreditos { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext>options):base(options)
        {

        }
    }
}
