using Library.DataProcessing.Contracts.Validation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Library.DataProcessing.Implementation.Validation
{
    internal class ValidationError : IValidationError
    {
        public string Code { get; set; }
        public string Description { get; set; }
    }
}
