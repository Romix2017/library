using System;
using System.Collections.Generic;
using System.Text;

namespace Library.DataTransferObjects.Filters
{
    public class BaseFilterDto
    {
        public int? Skip { get; set; }
        public int? Take { get; set; }
        public IEnumerable<int> Ids { get; set; }
    }
}
