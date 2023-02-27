using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportsApp.Core.Commands
{
    public class UpdateFullProfileCommand
    {
        public byte[] Avatar { get; set; }
        public string Username { get;set; }
        public string Email { get; set; }
    }
}