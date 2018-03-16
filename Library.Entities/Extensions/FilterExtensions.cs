using AutoMapper;
using AutoMapper.QueryableExtensions;
using Library.DataStorage.Contracts;
using Library.DataTransferObjects.Common;
using Library.Entities.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Library.Entities.Extensions
{
    public static class FilterExtensions
    {
        public static RecordSet<TDto> ToRecordSet<TEntity, TDto>(this BaseFilter<TEntity> filter, IQueryable<TEntity> source, IMapper mapper) where TEntity : IBaseEntity
        {
            var (items, total) = filter.ApplyTo(source);

            var items2 = items.ToList();


            IEnumerable<TDto> items3 = items.UseAsDataSource(mapper).For<TDto>();


            return new RecordSet<TDto>
            {
                Data = items.UseAsDataSource(mapper).For<TDto>(),
                Total = total.Value
            };
        }
    }
}
