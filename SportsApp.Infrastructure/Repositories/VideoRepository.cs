using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Update.Internal;
using SportsApp.Core.Commands;
using SportsApp.Core.Interfaces;
using SportsApp.Domain.Entities;
using SportsApp.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        public async Task<Video> GetByLinkAndNameAsync(UploadVideoCommand command)
        {
            var video = await _dbContext.Videos.FirstOrDefaultAsync(u => u.Link == command.Link && u.UploadedBy == command.UploadedBy);

            return video;
        }
        public async Task<IEnumerable<Video>> GetAllAsync()
        {
            var videos = await _dbContext.Videos.ToListAsync();

            return videos;
        }
    }
}
