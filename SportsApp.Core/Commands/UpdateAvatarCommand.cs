using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportsApp.Core.Commands
{
    public class UpdateAvatarCommand
    {
        public string Username { get; set; }
        public byte[] Avatar { get; set; }
    }
}
