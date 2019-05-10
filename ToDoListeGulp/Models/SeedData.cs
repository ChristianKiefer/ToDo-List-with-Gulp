using System;
using System.Linq;

namespace ToDoListe.Models
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;

    public class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new ToDoListeContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<ToDoListeContext>>()))
            {
                // Look for any movies.
                if (context.ToDo.Any())
                {
                    return;   // DB has been seeded
                }

                context.ToDo.AddRange(
                    new ToDo
                    {
                            Description = "Bücher bestellen",
                            DateToDo = DateTime.Parse("2019-4-12")
                        },

                    new ToDo
                    {
                        Description = "Backup testen",
                        DateToDo = DateTime.Parse("2019-4-22")
                    },
                    new ToDo
                        {
                            Description = "Bücher bestellen",
                            DateToDo = DateTime.Parse("2019-5-12")
                        },

                    new ToDo
                        {
                            Description = "Backup testen",
                            DateToDo = DateTime.Parse("2019-5-22")
                        },
                    new ToDo
                        {
                            Description = "Bücher bestellen",
                            DateToDo = DateTime.Parse("2019-6-12")
                        },

                    new ToDo
                        {
                            Description = "Backup testen",
                            DateToDo = DateTime.Parse("2019-6-22")
                        },
                    new ToDo
                        {
                            Description = "Bücher bestellen",
                            DateToDo = DateTime.Parse("2019-7-12")
                        },

                    new ToDo
                        {
                            Description = "Backup testen",
                            DateToDo = DateTime.Parse("2019-7-22")
                        },
                    new ToDo
                        {
                            Description = "Bücher bestellen",
                            DateToDo = DateTime.Parse("2019-8-12")
                        },

                    new ToDo
                        {
                            Description = "Backup testen",
                            DateToDo = DateTime.Parse("2019-8-22")
                        },
                    new ToDo
                        {
                            Description = "Bücher bestellen",
                            DateToDo = DateTime.Parse("2019-9-12")
                        },

                    new ToDo
                        {
                            Description = "Backup testen",
                            DateToDo = DateTime.Parse("2019-9-22")
                        },
                    new ToDo
                        {
                            Description = "Bücher bestellen",
                            DateToDo = DateTime.Parse("2019-10-12")
                        },

                    new ToDo
                        {
                            Description = "Backup testen",
                            DateToDo = DateTime.Parse("2019-10-22")
                        },
                    new ToDo
                        {
                            Description = "Bücher bestellen",
                            DateToDo = DateTime.Parse("2019-11-12")
                        },

                    new ToDo
                        {
                            Description = "Backup testen",
                            DateToDo = DateTime.Parse("2019-11-22")
                        },
                    new ToDo
                        {
                            Description = "Bücher bestellen",
                            DateToDo = DateTime.Parse("2019-12-12")
                        },

                    new ToDo
                        {
                            Description = "Backup testen",
                            DateToDo = DateTime.Parse("2019-12-22")
                        }
                );
                context.SaveChanges();
            }
        }
    }
}
