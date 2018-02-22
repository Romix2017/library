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
    [Route("api/Genres")]
    public class GenresController : Controller
    {
        private readonly IGenericService<Genre> _service;
        private readonly IMapper _mapper;
        private readonly IQueryable<Genre> _dataSource;


        public GenresController(IGenericService<Genre> service, IMapper mapper)
        {
            this._service = service;
            this._mapper = mapper;
            _dataSource = this._service.Get().AsQueryable();
            var list = _dataSource.ToList();
        }


        public RecordSet<GenreDto> Get([FromQuery] GenreFilterDto filterDto)
        {
            var filter = _mapper.Map<GenreFilter>(filterDto);

            return filter.ToRecordSet<Genre, GenreDto>(_dataSource, _mapper);
        }

        [HttpPost]
        public IEnumerable<DtoActionResult<GenreDto>> Post([FromBody] IEnumerable<GenreDto> updates)
        {
            var items = _mapper
                     .MapOntoExistingDataSource(updates, _dataSource);
            var result = items.Select(_service.Post).ToArray();

            foreach (var e in result)
            {
                yield return new DtoActionResult<GenreDto>
                {
                    DTO = _mapper.Map<GenreDto>(e.Entity),
                    Errors = _mapper.Map<IEnumerable<DtoError>>(e.Errors)
                };
            }

        }


        [HttpDelete]
        public DtoActionResult<GenreDto> Delete([FromQuery] GenreDto removeItem)
        {

            var item = _mapper.Map<Genre>(removeItem);
            var result = _service.Delete(item);


            return new DtoActionResult<GenreDto>
            {
                DTO = _mapper.Map<GenreDto>(result.Entity),
                Errors = _mapper.Map<IEnumerable<DtoError>>(result.Errors)
            };


        }


    }
}