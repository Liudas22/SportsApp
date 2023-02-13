using SportsApp.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportsApp.Core.DTO
{
    public class VideoDTO
    {
        public string UploadedBy { get; set; }
        public string Link { get; set; }
        public VideoStatus Status { get; set; }
    }
}
