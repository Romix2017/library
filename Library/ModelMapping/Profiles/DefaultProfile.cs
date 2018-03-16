using AutoMapper;
using Library.DataTransferObjects.Dto;
using Library.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Library.ModelMapping.Profiles
{
    public class DefaultProfile : Profile
    {
        public DefaultProfile()
        {
            CreateMap<Book, BookDto>().ForMember(d => d.GenreName, opt => opt.MapFrom(src => src.Genre.Name));
            CreateMap<BookDto, Book>().ForMember(x => x.Genre, x => x.Ignore());
            CreateMap<BookHistory, BookHistoryDto>().ForMember(d => d.BookName, opt => opt.MapFrom(src => src.Book.Name))
                                                    .ForMember(d => d.LibraryUserName, opt => opt.MapFrom(src => src.LibraryUser.Name));

            CreateMap<BookHistoryDto, BookHistory>().ForMember(x => x.Book, x => x.Ignore())
                                                    .ForMember(x => x.LibraryUser, x => x.Ignore());
            CreateMap<Genre, GenreDto>().ReverseMap();
            CreateMap<LibraryUser, LibraryUserDto>().ReverseMap();
        }
    }
}
