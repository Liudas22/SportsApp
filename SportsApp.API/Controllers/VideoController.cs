using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SportsApp.API.Attributes;
using SportsApp.Core.Commands;
using SportsApp.Core.DTO;
using SportsApp.Core.Interfaces;
using SportsApp.Core.Services;
using SportsApp.Domain.Entities;
using SportsApp.Domain.Enums;
using SportsApp.Domain.Exceptions;
using SportsApp.Domain.Models.DTO;
using SportsApp.Infrastructure.Repositories;

namespace SportsApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class VideoController : Controller
    {
        private readonly IVideoRepository _videoRepository;
        private readonly IVideoService _videoService;
        private readonly IMapper _mapper;
        public VideoController(
            IVideoRepository videoRepository,
            IVideoService videoService,
            IMapper mapper)
        {
            _videoRepository = videoRepository;
            _videoService = videoService;
            _mapper = mapper;
        }
        [HttpPost]
        public async Task<ActionResult> UploadVideo([FromBody] UploadVideoCommand command)
        {
            var video = await _videoService.UploadVideoAsync(command);

            if (video == null)
            {
                throw new ConflictException("Toks vaizdo įrašas jau egzistuoja");
            }

            var videoDto = _mapper.Map<VideoDTO>(video);

            return Ok(videoDto);
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VideoDTO>>> AllVideos()
        {
            var videos = await _videoRepository.GetAllAsync();

            var videosDto = videos.Select(video => _mapper.Map<VideoDTO>(video));

            return Ok(videosDto);
        }
        [HttpGet]
        [AuthorizeRole(UserRole.Coach)]
        public async Task<ActionResult<IEnumerable<VideoDTO>>> GetUnapprovedVideos()
        {
            var videos = await _videoRepository.GetUnapprovedVideosAsync();

            var videosDto = videos.Select(video => _mapper.Map<VideoDTO>(video));

            return Ok(videosDto);
        }
        [HttpPut]
        public async Task<ActionResult> UpdateVideoStatus(UpdateVideoStatusCommand command)
        {
            var video = await _videoService.UpdateVideoStatusAsync(command);

            return Ok(video);
        }
    }
}