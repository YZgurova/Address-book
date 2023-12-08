using System.Web;
using Newtonsoft.Json;
using RandomUser.Models;

namespace RandomUser.Services
{
    public class RandomUserService : IRandomUserService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public RandomUserService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }


        private async Task<Result> GetRandomUsersAsync(int page, int results, string gender, List<string> nationalities)
        {
            string apiUrl = _configuration["RandomUserApiUrl"];

            UriBuilder uriBuilder = new UriBuilder(apiUrl);
            var parameters = HttpUtility.ParseQueryString(uriBuilder.Query);
            parameters["exc"] = "login";
            parameters["page"] = page.ToString();
            parameters["results"] = results.ToString();
            if (gender != null && gender != string.Empty)
            {
                parameters["gender"] = gender;
            }
            if(nationalities != null && nationalities.Any())
            {
                parameters["nat"] = string.Join(", ", nationalities);
            }

            uriBuilder.Query = parameters.ToString();

            string url = uriBuilder.ToString();
            HttpResponseMessage response = await _httpClient.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                string json = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<Result>(json);
            }

            // Handle error cases here
            return null;
        }

        async Task<Result> IRandomUserService.GetRandomUsersAsync(int page, int results)
        {
            return await GetRandomUsersAsync(page,results, "", null);
        }

        async Task<Result> IRandomUserService.GetRandomUsersByPropAsync(int page, int results, string gender, List<string> nationalities)
        {
            return await GetRandomUsersAsync(page, results, gender, nationalities);
        }
    }
}
