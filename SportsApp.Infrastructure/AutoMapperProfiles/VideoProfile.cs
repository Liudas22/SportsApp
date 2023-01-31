using AutoMapper;
using SportsApp.Core.DTO;
using SportsApp.Domain.Entities;
using SportsApp.Domain.Models.DTO;

namespace SportsApp.Infrastructure.AutoMapperProfiles
{
    public class VideoProfile : Profile
    {
        public VideoProfile()
        {
            CreateMap<Video, VideoDTO>();
        }
    }
}
