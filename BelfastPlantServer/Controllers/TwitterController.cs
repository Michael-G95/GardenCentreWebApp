using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text;
using System.Net;
using BelfastPlantServer.Models;

namespace BelfastPlantServer.Controllers
{
    [Route("api/[controller]")]
    public class TwitterController : Controller
    {

        private static HttpClient httpClient = new HttpClient();

        public TwitterController()
        {
            // Adding header for JWT Bearer auth
            if (!httpClient.DefaultRequestHeaders.Contains("authorization"))
            {
                httpClient.DefaultRequestHeaders.Add("authorization", "Bearer AAAAAAAAAAAAAAAAAAAAAOCS9AAAAAAABBYMFFonT0Y0kOR%2BJdhoGqRY41s%3Dc4ppRy5pBfqoo1lzKQEplIN4Jxs23T4PHcuALEvzPYg2CIVzhE");
            }
          
        }

        [HttpGet("[action]")]
        public async Task<Tweet> GetTweet()
        {
            // Get the last tweet of garden centre from twitter API
            // Can't be done client-side as twitter API doesn't provide a OPTIONS preflight check response, causing CORS checks to fail in browsers.
            
            var response = await httpClient.GetAsync("https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=1216073093619310595&count=1");
            var result = (await response.Content.ReadAsAsync<List<Tweet>>())[0];
            return result;

        }

        

    }
}
