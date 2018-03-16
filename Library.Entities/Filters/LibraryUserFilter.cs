using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Library.Entities.Models;

namespace Library.Entities.Filters
{
    public class LibraryUserFilter : BaseFilter<LibraryUser>
    {
        public string Name { get; set; }

        public override (IQueryable<LibraryUser> items, Lazy<int> total) ApplyTo(IQueryable<LibraryUser> source)
        {
            source = SearchByString(nameof(Name), source, Name);
            return base.ApplyTo(source);
        }
    }
}
