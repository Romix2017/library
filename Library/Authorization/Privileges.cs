using IdentityServer4.AccessTokenValidation;
using Library.Extensions;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RC = Library.DataTransferObjects.Enum.AppRoleCode;
namespace Library.Authorization
{
    public class Privileges
    {
        public const string
           RoleCodeClaim = "rolecode",
           PrivilegesClaim = "privileges",
           ViewBooks = "ViewBooksPrivilege",
           ViewHistoryBooks = "ViewHistoryBooksPrivilege",
           ViewGenres = "ViewGenres",
           DeleteBooks = "DeleteBookPrivilege",
           DeleteGenres = "DeleteGenresPrivilege",
           DeleteHistoryBooks = "DeleteHistoryBookPrivilege";


        static Privileges()
        {
            PrivilegesInRole = RolesWithPrivilege.InvertCollectionDictionary();
        }

        public static readonly IReadOnlyDictionary<RC, IEnumerable<string>> PrivilegesInRole;


        public static readonly IReadOnlyDictionary<string, IEnumerable<RC>> RolesWithPrivilege
          = new Dictionary<string, IEnumerable<RC>>
          {
                { ViewBooks,        new[] { RC.Manager, RC.Librarian } },
                { ViewHistoryBooks,        new[] { RC.Manager, RC.Librarian } },
                { ViewGenres,        new[] { RC.Manager, RC.Librarian } },
                { DeleteGenres,        new[] { RC.Manager } },
                { DeleteBooks,        new[] { RC.Manager } },
                { DeleteHistoryBooks,        new[] { RC.Manager } },
          };


        public static IEnumerable<KeyValuePair<string, AuthorizationPolicy>> GetPrivilegePolicies()
        {
            return RolesWithPrivilege.Select(rwp =>
            {
                var policy =
                    new AuthorizationPolicyBuilder("Bearer")
                    //.AddAuthenticationSchemes(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                    .RequireAuthenticatedUser()
                    .RequireClaim(
                        RoleCodeClaim,
                        rwp.Value.Select(
                            code => Enum.GetName(typeof(RC), code)).ToArray())
                    .Build();

                return new KeyValuePair<string, AuthorizationPolicy>(rwp.Key, policy);
            });
        }
    }
}
