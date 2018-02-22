using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Library.DataProcessing.Contracts.DataServices;
using Library.DataProcessing.Implementation.Validation;
using Library.DataTransferObjects.Common;
using Library.DataTransferObjects.Dto;
using Library.DataTransferObjects.Filters;
using Library.Entities.Extensions;
using Library.Entities.Filters;
using Library.Entities.Models;
using Library.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace Library.Controllers
{
    [Produces("application/json")]
    [Route("api/BooksHistory")]
    public class BooksHistoryController : Controller
    {
        private readonly IGenericService<BookHistory> _service;
        private readonly IMapper _mapper;
        private readonly IQueryable<BookHistory> _dataSource;


        public BooksHistoryController(IGenericService<BookHistory> service, IMapper mapper)
        {
            this._service = service;
            this._mapper = mapper;
            this._dataSource = this._service.Get().AsQueryable();
            var list = _dataSource.ToList();
        }


        public RecordSet<BookHistoryDto> Get([FromQuery] BookHistoryFilterDto filterDto)
        {
            var filter = _mapper.Map<BookHistoryFilter>(filterDto);

            return filter.ToRecordSet<BookHistory, BookHistoryDto>(_dataSource, _mapper);
        }

        [HttpPost]
        public IEnumerable<DtoActionResult<BookHistoryDto>> Post([FromBody] IEnumerable<BookHistoryDto> updates)
        {
            var items = _mapper
                     .MapOntoExistingDataSource(updates, _dataSource);
            var result = items.Select(_service.Post).ToArray();

            foreach (var e in result)
            {
                yield return new DtoActionResult<BookHistoryDto>
                {
                    DTO = _mapper.Map<BookHistoryDto>(e.Entity),
                    Errors = _mapper.Map<IEnumerable<DtoError>>(e.Errors)
                };
            }

        }

    }
}