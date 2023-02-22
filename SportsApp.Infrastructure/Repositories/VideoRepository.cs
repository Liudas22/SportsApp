using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Update.Internal;
using SportsApp.Core.Commands;
using SportsApp.Core.DTO;
using SportsApp.Core.Interfaces;
using SportsApp.Domain.Entities;
using SportsApp.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.WebUtilities;
using System.Text.Encodings.Web;
using System.Web;
using SportsApp.Domain.Enums;

namespace SportsApp.Infrastructure.Repositories
{
    public class VideoRepository : IVideoRepository
    {
        private readonly DatabaseContext _dbContext;
        public VideoRepository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Video> AddVideo(Video newVideo)
        {
            _dbContext.Videos.Add(newVideo);
            await _dbContext.SaveChangesAsync();
            return newVideo;
        }
        public async Task<Video> GetByLinkAsync(string link)
        {
            var video = await _dbContext.Videos.FirstOrDefaultAsync(u => u.Link == link);

            return video;
        }
        public async Task<Video> GetByLinkAndNameAsync(string name, string link)
        {
            var video = await _dbContext.Videos.FirstOrDefaultAsync(u => u.UploadedBy == name && u.Link == link);

            return video;
        }
        public async Task<IEnumerable<Video>> GetAllAsync()
        {
            var videos = await _dbContext.Videos.ToListAsync();

            return videos;
        }
        public async Task<IEnumerable<Video>> GetPendingVideosAsync()
        {
            var videos = await _dbContext.Videos.ToListAsync();
            List<Video> filteredByStatus = new List<Video>();
            foreach(Video video in videos)
            {
                if(video.Status == VideoStatus.Pending) filteredByStatus.Add(video);
            }
            return filteredByStatus;
        }
        public async Task<Video> UpdateStatusAsync(Video videoToChange, VideoStatus status)
        {
            videoToChange.Status = status;
            _dbContext.Videos.Update(videoToChange);
            await _dbContext.SaveChangesAsync();
            return videoToChange;
        }

        public async Task<IEnumerable<Video>> GetMyVideos(string username)
        {
            var videos = await _dbContext.Videos.ToListAsync();
            List<Video> filteredByName = new List<Video>();
            foreach (Video video in videos)
            {
                if (video.UploadedBy == username) filteredByName.Add(video);
            }
            return filteredByName;
        }
    }
}
