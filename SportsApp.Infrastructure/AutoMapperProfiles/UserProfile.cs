using AutoMapper;
using SportsApp.Domain.Entities;
using SportsApp.Domain.Models.DTO;

namespace SportsApp.Infrastructure.AutoMapperProfiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDto>();
        }
    }
}
