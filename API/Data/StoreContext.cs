using API.Entities;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : IdentityDbContext<User, Role, int>
    {
        //sve ce koristiti int kao id (sve identity klase)


        public StoreContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Product> Products { get; set; }
        public DbSet<Basket> Baskets { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //konfigurisanje veze u EF
            //korisnik ima jednu adresu sa jednim userom
            builder.Entity<User>()
                .HasOne(a=>a.Address)
                .WithOne()
                .HasForeignKey<UserAddress>(a=>a.Id)
                .OnDelete(DeleteBehavior.Cascade);



            builder.Entity<Role>()
                .HasData(
                    //nema mogucnost auto inc ID ako su int:
                    new Role{Id=1, Name="Member", NormalizedName="MEMBER"},
                    new Role{Id=2, Name="Admin", NormalizedName="ADMIN"}
                );
        }
    }
}