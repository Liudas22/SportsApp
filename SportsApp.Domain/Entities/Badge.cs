using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportsApp.Domain.Entities
{
    public class Badge
    {
        public Guid Id { get; set; }
        public int Level { get; set; }
        public byte[] Logo { get; set; }
    }
}