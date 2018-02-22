using System;
using System.Collections.Generic;
using System.Text;

namespace Library.DataTransferObjects.Common
{
    public class RecordSet<T>
    {
        public IEnumerable<T> Data { get; set; }
        public int? Total { get; set; }
    }
}
