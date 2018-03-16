using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Library.Authorization;
using Library.DataProcessing.Contracts.DataServices;
using Library.DataTransferObjects.Common;
using Library.DataTransferObjects.Dto;
using Library.DataTransferObjects.Filters;
using Library.Entities.Extensions;
using Library.Entities.Filters;
using Library.Entities.Models;
using Library.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Library.Controllers
{
    [Produces("application/json")]
    [Route("api/users")]
    [Authorize]
    public class UsersController : Controller
    {
        private readonly IGenericService<LibraryUser> _service;
        private readonly IMapper _mapper;
        private readonly IQueryable<LibraryUser> _dataSource;


        public UsersController(IGenericService<LibraryUser> service, IMapper mapper)
        {
            this._service = service;
            this._mapper = mapper;
            _dataSource = this._service.Get().AsQueryable();
            var list = _dataSource.ToList();
        }


        public RecordSet<LibraryUserDto> Get([FromQuery] LibraryUserFilterDto filterDto)
        {
            var filter = _mapper.Map<LibraryUserFilter>(filterDto);

            return filter.ToRecordSet<LibraryUser, LibraryUserDto>(_dataSource, _mapper);
        }

        [HttpPost]
        public IEnumerable<DtoActionResult<LibraryUserDto>> Post([FromBody] IEnumerable<LibraryUserDto> updates)
        {
            var items = _mapper
                .MapOntoExistingDataSource(updates, _dataSource);
            var result = items.Select(_service.Post).ToArray();

            foreach (var e in result)
            {
                yield return new DtoActionResult<LibraryUserDto>
                {
                    DTO = _mapper.Map<LibraryUserDto>(e.Entity),
                    Errors = _mapper.Map<IEnumerable<DtoError>>(e.Errors)
                };
            }

        }


        [HttpDelete, Authorize(Policy = Privileges.DeleteGenres)]
        public DtoActionResult<LibraryUserDto> Delete([FromQuery] LibraryUserDto removeItem)
        {

            var item = _mapper.Map<LibraryUser>(removeItem);
            var result = _service.Delete(item);


            return new DtoActionResult<LibraryUserDto>
            {
                DTO = _mapper.Map<LibraryUserDto>(result.Entity),
                Errors = _mapper.Map<IEnumerable<DtoError>>(result.Errors)
            };


        }
    }
}