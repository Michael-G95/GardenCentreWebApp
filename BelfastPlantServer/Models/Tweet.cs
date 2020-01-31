using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BelfastPlantServer.Models
{
    public class TweetArray
    {
        public List<Tweet> Tweets { get; set; }
    }
    public class Tweet
    {
        public String created_at { get; set; }
        public String text { get; set; }
    }

}
