using SportsApp.Core.Commands;
using SportsApp.Core.Interfaces;
using SportsApp.Domain.Entities;
using SportsApp.Domain.Exceptions;
using SportsApp.Domain.Enums;

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
            if(await _videoRepository.GetByLinkAndNameAsync(command) != null)
            {
                throw new ConflictException("Vaizdo įrašas su tokia nuoroda jau egzistuoja");
            }
            var video = new Video()
            {
                Id = Guid.NewGuid(),
                UploadedBy = command.UploadedBy,
                Link = command.Link,
                Status = VideoStatus.Pending
            };

            await _videoRepository.AddVideo(video);

            return video;
        }
        public async Task<Video?> UpdateVideoStatusAsync(UpdateVideoStatusCommand command)
        {
            var video = await _videoRepository.GetByLinkAsync(command.Link);

            if (video == null)
            {
                throw new NotFoundException("Vaizdo įrašas nerastas");
            }
            await _videoRepository.UpdateStatusAsync(video, command.Status);

            return video;
        }
    }
}
