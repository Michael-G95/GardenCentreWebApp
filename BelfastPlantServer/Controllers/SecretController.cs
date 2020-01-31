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
    public class SecretController : Controller
    {
        private static Secret _secret = new Secret("",0);

        [HttpGet("[action]")]
        public async Task<String> GetSecret()
        {
            // Endpoint Resource to profide the trefle JWTtoken for the client app.
            // Can't do this client side as exposing the raw API key is a security risk
            return await _secret.GetValidSecret();
        }


        public class Secret
        {
            // Class to manage the JWT secret token
            public string SECRET { get; set; } // token
            public long DATESTAMP { get; set; } // expiration

            public Secret(String str, long datestamp)
            {
                // Pass in starter values
                SECRET = str;
                DATESTAMP = datestamp;
            }

            public bool isValid()
            {
                // Checks if the unix timestamp of NOW is greater than the expiration unix timestamp
                long time = ((DateTimeOffset)(DateTime.UtcNow)).ToUnixTimeSeconds();
                return time > DATESTAMP ? false : true;
            }

            public async Task<String> GetValidSecret()
            {
                if (!isValid())
                {
                    // If invalid - need to get a new JWT token
                    var client = new HttpClient();
                    
                    HttpResponseMessage response = await client.PostAsync("https://trefle.io/api/auth/claim?token=REczUVpmWW9BaEEzSGFRSzRJeGdPZz09&origin=*", null) ;
                    var result = await response.Content.ReadAsAsync<TrefleResponse>();
                    SECRET = result.token;
                }
                // Have a good token - return it

                return SECRET;
            }
        }
       
    }
}
