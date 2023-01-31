using SportsApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportsApp.Core.Interfaces
{
    public interface IVideoRepository
    {
        Task<Video> GetByLinkAsync(string link);
        Task<Video> AddVideo(Video newVideo);
        Task<IEnumerable<Video>> GetAllAsync();
    }
}
