using Microsoft.AspNetCore.Mvc;
using Moq;
using RandomUser.Models;
using RandomUser.Services;
using Xunit;

namespace RandomUser.Controllers.Tests
{
    public class RandomUserControlerTests
    {
        [Fact]
        public async Task GetRandomUsers_ReturnsOkResult()
        {
            var mockUserService = new Mock<IRandomUserService>();
            mockUserService.Setup(service => service.GetRandomUsersAsync(It.IsAny<int>(), It.IsAny<int>()))
                .ReturnsAsync(new Result());

            var controller = new RandomUserControler(mockUserService.Object);

            var result = await controller.GetRandomUsers(1, 10);

            Assert.IsType<OkObjectResult>(result.Result);
        }

        [Fact]
        public async Task GetRandomUsers_ReturnsNotFoundResult()
        {
            var mockUserService = new Mock<IRandomUserService>();
            mockUserService.Setup(service => service.GetRandomUsersAsync(It.IsAny<int>(), It.IsAny<int>()))
                .ReturnsAsync((Result)null);

            var controller = new RandomUserControler(mockUserService.Object);

            var result = await controller.GetRandomUsers(1, 10);

            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task GetRandomUsersWithSearch_ReturnsOkResult()
        {
            var mockUserService = new Mock<IRandomUserService>();
            mockUserService.Setup(service => service.GetRandomUsersByPropAsync(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<string>(), It.IsAny<List<string>>()))
                .ReturnsAsync(new Result());

            var controller = new RandomUserControler(mockUserService.Object);

            var result = await controller.GetRandomUsers(1, 10, new List<string>(), "Female");

            Assert.IsType<OkObjectResult>(result.Result);
        }

        [Fact]
        public async Task GetRandomUsersWithSearch_ReturnsNotFoundResult()
        {
            var mockUserService = new Mock<IRandomUserService>();
            mockUserService.Setup(service => service.GetRandomUsersByPropAsync(It.IsAny<int>(), It.IsAny<int>(), It.IsAny<string>(), It.IsAny<List<string>>()))
                .ReturnsAsync((Result)null);

            var controller = new RandomUserControler(mockUserService.Object);

            var result = await controller.GetRandomUsers(1, 10, new List<string>(), "Male");

            Assert.IsType<NotFoundResult>(result.Result);
        }
    }
}