using RandomUser.Models;

namespace RandomUser.Services
{
    public interface IRandomUserService
    {
        Task<Result> GetRandomUsersAsync(int page, int results);
        Task<Result> GetRandomUsersByPropAsync(int page, int results, string gender, List<string> nationalities);
    }
}
