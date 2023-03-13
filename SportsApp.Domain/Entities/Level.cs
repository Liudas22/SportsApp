using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportsApp.Domain.Entities
{
    public class Level
    {
        public Guid Id { get; set; }
        public int LevelID { get; set; }
        public int Pullups { get; set; }
        public int Pushups { get; set; }
        public int Dips { get; set; }
        public int Squats { get; set; }
        public byte[] Logo { get; set; }
    }
}
