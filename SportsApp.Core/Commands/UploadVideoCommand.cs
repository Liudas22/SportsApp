using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportsApp.Core.Commands
{
    public class UploadVideoCommand
    {
        public string UploadedBy { get; set; }
        public string Link { get; set; }
    }
}
