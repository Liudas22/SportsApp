using SportsApp.Core.Commands;
using SportsApp.Core.Interfaces;
using SportsApp.Domain.Entities;
using SportsApp.Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportsApp.Core.Services
{
    public class VideoService : IVideoService
    {
        private readonly IVideoRepository _videoRepository;

        public VideoService(IVideoRepository videoRepository, IHashService hashService)
        {
            _videoRepository = videoRepository;
        }
        public async Task<Video?> UploadVideoAsync(UploadVideoCommand command)
        {
            if(await _videoRepository.GetByLinkAsync(command.Link) != null)
            {
                throw new ConflictException("Vaizdo įrašas su tokia nuoroda jau egzistuoja");
            }
            var video = new Video()
            {
                Id = Guid.NewGuid(),
                UploadedBy = command.UploadedBy,
                Link = command.Link
            };

            await _videoRepository.AddVideo(video);

            return video;
        }
    }
}
