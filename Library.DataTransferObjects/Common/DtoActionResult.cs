using Library.DataTransferObjects.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Library.DataTransferObjects.Common
{
    public class DtoActionResult<T> where T : BaseDto
    {
        public T DTO { get; set; }
        public IEnumerable<DtoError> Errors { get; set; }
    }
}
