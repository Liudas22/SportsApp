using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportsApp.Core.Commands
{
    public class LevelCommand
    {
        public int LevelID { get; set; }
        public int Pullups { get; set; }
        public int Pushups { get; set; }
        public int Squats { get; set; }
        public int Dips { get; set; }
    }
}
