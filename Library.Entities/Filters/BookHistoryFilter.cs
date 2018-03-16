using Library.Entities.Models;
using Library.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Library.Entities.Filters
{
    public class BookHistoryFilter : BaseFilter<BookHistory>
    {
        public string Name { get; set; }

        public override (IQueryable<BookHistory> items, Lazy<int> total) ApplyTo(IQueryable<BookHistory> source)
        {
            if (!string.IsNullOrEmpty(Name))
            source = source.Where(x => x.Book.Name.ToLower().Contains(Name.ToLower()));

            return base.ApplyTo(source);
        }
    }
}
