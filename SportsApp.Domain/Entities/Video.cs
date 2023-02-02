using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportsApp.Domain.Entities
{
    public class Video
    {
        public Guid Id { get; set; }
        public string UploadedBy { get; set; }
        public string Link { get; set; }
        public bool IsApproved { get; set; }
    }
}
