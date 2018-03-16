using Library.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Library.Entities.Filters
{
    public class GenreFilter : BaseFilter<Genre>
    {
        public string Name { get; set; }

        public override (IQueryable<Genre> items, Lazy<int> total) ApplyTo(IQueryable<Genre> source)
        {
            source = SearchByString(nameof(Name), source, Name);
            return base.ApplyTo(source);
        }
    }
}
