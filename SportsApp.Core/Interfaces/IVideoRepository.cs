using SportsApp.Core.Commands;
using SportsApp.Core.DTO;
using SportsApp.Domain.Entities;
using SportsApp.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportsApp.Core.Interfaces
{
    public interface IVideoRepository
    {
        Task<Video> GetByLinkAndNameAsync(string name, string link);
        Task<Video> AddVideo(Video newVideo);
        Task<IEnumerable<Video>> GetAllAsync();
        Task<IEnumerable<Video>> GetPendingVideosAsync();
        Task<Video> GetByLinkAsync(string link);
        Task<Video> UpdateStatusAsync(Video videoToChange, VideoStatus status);
        Task<IEnumerable<Video>> GetMyVideos(string username);
    }
}
