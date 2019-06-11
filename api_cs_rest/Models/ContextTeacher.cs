using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

namespace CsMyApi.Models
{
    public class ContextTeacher : DbContext
    {
        public ContextTeacher(DbContextOptions<ContextTeacher> options)
            : base(options)
        {

        }

        public DbSet<ItemTeacher> TeacherItems { get; set; }
    }
}




