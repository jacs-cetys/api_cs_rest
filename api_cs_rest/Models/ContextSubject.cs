using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

namespace CsMyApi.Models
{
    public class ContextSubject : DbContext
    {
        public ContextSubject(DbContextOptions<ContextSubject> options)
            : base(options)
        {

        }

        public DbSet<ItemSubject> SubjectItems { get; set; }
    }
}




