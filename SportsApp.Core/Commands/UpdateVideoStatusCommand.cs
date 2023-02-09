using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportsApp.Core.Commands
{
    public class UpdateVideoStatusCommand
    {
        public string Link { get; set; }
        public bool Status { get; set; }
    }
}
