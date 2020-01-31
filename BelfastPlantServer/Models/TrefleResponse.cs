using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BelfastPlantServer.Models
{
    public class TrefleResponse
    {
        public string token { get; set; }
        public long expiration { get; set; }
    }
}
