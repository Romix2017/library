using AutoMapper;
using Library.DataStorage.Contracts;
using Library.DataTransferObjects.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Library.Extensions
{
    public static class MapperExtensions
    {
        public static IEnumerable<TEntity> MapOntoExistingDataSource<TEntity, TModel>(this IMapper mapper, IEnumerable<TModel> dtos, IQueryable<TEntity> repository, bool includeNonExisting = true)
       where TEntity : IBaseEntity
       where TModel : BaseDto
        {
            var ids = dtos.Select(dto => dto.Id).ToArray();
            var existingEntities = repository.Where(e => ids.Contains(e.Id)).ToArray();
            var result = dtos
                .GroupJoin(existingEntities, dto => dto.Id, e => e.Id, (dto, entities) => new
                {
                    dto,
                    entity = entities.FirstOrDefault()
                })
                .Where(i => includeNonExisting || i.entity != null)
                .Select(i => i.entity != null ? mapper.Map(i.dto, i.entity) : mapper.Map<TEntity>(i.dto))
                .ToArray();
            return result;
        }
    }
}
