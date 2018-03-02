using IdentityServer4;
using IdentityServer4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Library
{
    public class IdentityServerConfig
    {


        public static IEnumerable<ApiResource> GetApiResources()
        {
            yield return new ApiResource("api1", "SPA API");
        }

        public static IEnumerable<Client> GetClients()
        {
            yield return new Client
            {
                ClientId = "web_dashboard",
                AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                RequireClientSecret = false,
                AllowedScopes = { "api1" },
                AllowOfflineAccess = true
            };
        }
    }
}

