using SportsApp.Core.Commands;
using SportsApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportsApp.Core.Interfaces
{
    public interface IVideoService
    {
        Task<Video?> UploadVideoAsync(UploadVideoCommand command);
        Task<Video?> UpdateVideoStatusAsync(UpdateVideoStatusCommand command);
    }
}
