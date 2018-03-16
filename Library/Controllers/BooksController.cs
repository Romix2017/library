using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Library.Authorization;
using Library.DataProcessing.Contracts.DataServices;
using Library.DataProcessing.Implementation.Validation;
using Library.DataTransferObjects.Common;
using Library.DataTransferObjects.Dto;
using Library.DataTransferObjects.Filters;
using Library.Entities.Extensions;
using Library.Entities.Filters;
using Library.Entities.Models;
using Library.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using IdentityServer4.AccessTokenValidation;

namespace Library.Controllers
{
    [Produces("application/json")]
    [Route("api/Books")]
    [Authorize]
    public class BooksController : Controller
    {
        private readonly IGenericService<Book> _service;
        private readonly IMapper _mapper;
        private readonly IQueryable<Book> _dataSource;


        public BooksController(IGenericService<Book> service, IMapper mapper)
        {
            this._service = service;
            this._mapper = mapper;
            _dataSource = this._service.Get().AsQueryable();
            var list = _dataSource.ToList();
        }

        [HttpGet]
        public RecordSet<BookDto> Get([FromQuery] BookFilterDto filterDto)
        {
            var filter = _mapper.Map<BookFilter>(filterDto);

            return filter.ToRecordSet<Book, BookDto>(_dataSource, _mapper);
        }
        [HttpPost]
        public IEnumerable<DtoActionResult<BookDto>> Post([FromBody] IEnumerable<BookDto> updates)
        {
            var items = _mapper
                     .MapOntoExistingDataSource(updates, _dataSource);
            IEnumerable<BookDto> array = _dataSource.UseAsDataSource(_mapper).For<BookDto>();

            var result = items.Select(_service.Post).ToArray();

            foreach (var e in result)
            {
                yield return new DtoActionResult<BookDto>
                {
                    DTO = array.FirstOrDefault(x => x.Id == e.Entity.Id),
                    Errors = _mapper.Map<IEnumerable<DtoError>>(e.Errors)
                };
            }

        }

        [HttpDelete, Authorize(Policy = Privileges.DeleteBooks)]
        public DtoActionResult<BookDto> Delete([FromQuery] BookDto removeItem)
        {

            var item = _mapper.Map<Book>(removeItem);
            var result = _service.Delete(item);


            return new DtoActionResult<BookDto>
            {
                DTO = _mapper.Map<BookDto>(result.Entity),
                Errors = _mapper.Map<IEnumerable<DtoError>>(result.Errors)
            };


        }



    }
}