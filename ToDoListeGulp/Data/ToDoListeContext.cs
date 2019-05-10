using Microsoft.EntityFrameworkCore;

namespace ToDoListe.Models
{
    public class ToDoListeContext : DbContext
    {
        public ToDoListeContext (DbContextOptions<ToDoListeContext> options)
            : base(options)
        {
        }

        public DbSet<ToDo> ToDo { get; set; }
    }
}
