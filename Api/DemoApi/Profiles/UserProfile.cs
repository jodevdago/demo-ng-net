using AutoMapper;
using DemoApi.DTOs;
using DemoApi.Models;

namespace DemoApi.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            // CreateUserDto => User
            CreateMap<CreateUserDto, User>();

            // UpdateUserDto => User
            CreateMap<UpdateUserDto, User>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));

            // User => ReadUserDto
            CreateMap<User, ReadUserDto>();
        }
    }
}
