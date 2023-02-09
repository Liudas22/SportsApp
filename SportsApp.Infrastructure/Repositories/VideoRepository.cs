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
            Console.WriteLine(HttpUtility.UrlDecode(link));
            string decodedLink = HttpUtility.UrlDecode(link);
            foreach (Video viddd in _dbContext.Videos)
            {
                Console.WriteLine(viddd.Link);
                Console.WriteLine(decodedLink == viddd.Link);
            }
            var video = await _dbContext.Videos.FirstOrDefaultAsync(u => u.Link == decodedLink);

            return video;
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
        public async Task<IEnumerable<Video>> GetUnapprovedVideosAsync()
        {
            var videos = await _dbContext.Videos.ToListAsync();
            List<Video> filteredByStatus = new List<Video>();
            foreach(Video video in videos)
            {
                if(video.IsApproved == false) filteredByStatus.Add(video);
            }
            return filteredByStatus;
        }
        public async Task<Video> UpdateStatusAsync(Video videoToChange, bool status)
        {
            videoToChange.IsApproved = status;
            _dbContext.Videos.Update(videoToChange);
            await _dbContext.SaveChangesAsync();
            return videoToChange;
        }
    }
}
