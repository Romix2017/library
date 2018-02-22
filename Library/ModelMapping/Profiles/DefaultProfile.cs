using AutoMapper;
using Library.DataTransferObjects.Dto;
using Library.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Library.ModelMapping.Profiles
{
    public class DefaultProfile: Profile
    {
        public DefaultProfile()
        {
            CreateMap<Book, BookDto>().ReverseMap();
            CreateMap<BookHistory, BookHistoryDto>().ReverseMap();
            CreateMap<Genre, GenreDto>().ReverseMap();
        }
    }
}
