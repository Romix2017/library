using System;
using System.Collections.Generic;
using System.Text;

namespace Library.DataProcessing.Contracts.Validation
{
    public interface IValidationError
    {
        string Code { get; }
        string Description { get; }
    }
}
