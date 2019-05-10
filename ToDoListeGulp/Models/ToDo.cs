using System;

namespace ToDoListe.Models
{
    using System.ComponentModel.DataAnnotations;

    public class ToDo
    {
        public int ID { get; set; }

        [StringLength(60, MinimumLength = 3)]
        [Display(Name = "Was ist zu tun?")]
        [Required]
        public string Description { get; set; }

        [DataType(DataType.Date)]
        [Display(Name = "Wann erledigen")]
        public DateTime DateToDo { get; set; }

    }
}
