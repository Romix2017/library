using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Library.DataTransferObjects.Common;
using Library.DataTransferObjects.Dto;
using Library.DataTransferObjects.Filters;
using Library.Entities.Extensions;
using Library.Entities.Filters;
using Library.Entities.Models;
using Library.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Library.Controllers
{
    public class UsersController : Controller
    {
        private readonly IMapper mapper;
        private readonly UserManager<User> userManager;

        public UsersController(IMapper mapper, UserManager<User> userManager)
        {
            this.mapper = mapper;
            this.userManager = userManager;
        }

        [HttpGet]//, Authorize(Policy = Privileges.ViewUsers)]
        public RecordSet<UserDto> Get([FromQuery] UserFilterDto filterDto)
        {
            var filter = mapper.Map<UserFilter>(filterDto);
            return filter.ToRecordSet<User, UserDto>(userManager.Users, mapper);
        }

        [HttpPost]//, Authorize(Policy = Privileges.EditUsers)]
        public IEnumerable<DtoActionResult<UserDto>> Post([FromBody] IEnumerable<UserDto> updates)
        {
            DtoActionResult<UserDto> IdentityResultToDtoActionResult(IdentityResult result, UserDto dto)
            {
                return new DtoActionResult<UserDto>
                {
                    DTO = dto,
                    Errors = result.Errors.Select(ierr => new DtoError
                    {
                        Code = ierr.Code,
                        Text = ierr.Description
                    })
                };
            }

            var entities = mapper.MapOntoExistingDataSource(updates, userManager.Users);
            Func<User, bool> IsNew = e => e.Id == default(int);
            foreach (var e in entities.Where(IsNew))
            {
                var result = userManager.CreateAsync(e, updates.First(dto => dto.Id == e.Id).Password).Result;
                yield return IdentityResultToDtoActionResult(result, mapper.Map<UserDto>(e));
            }
            foreach (var e in entities.Where(e => !IsNew(e)))
            {
                var result = userManager.UpdateAsync(e).Result;
                yield return IdentityResultToDtoActionResult(result, mapper.Map<UserDto>(e));
            }
        }

        //[Route("sysadmin"), HttpPost]//, AllowAnonymous]
        //public IActionResult RegisterDefaultAdmin(
        //    [FromQuery] string username, [FromQuery] string password)
        //{
        //    var result = setupService.CreateAdminAsync(username, password).Result;
        //    if (result.Succeeded)
        //    {
        //        return Ok();
        //    }
        //    else
        //    {
        //        var errors = result.Errors.Select(error => KeyValuePair.Create(error.Code, error.Description));
        //        return BadRequest(errors);
        //    }
        //}
    }
}