using Library.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Library.Entities.Filters
{
    public class BookFilter : BaseFilter<Book>
    {
        public string Name { get; set; }

        public override (IQueryable<Book> items, Lazy<int> total) ApplyTo(IQueryable<Book> source)
        {
            source = SearchByString(nameof(Name), source, Name);
            return base.ApplyTo(source);
        }
    }
}
