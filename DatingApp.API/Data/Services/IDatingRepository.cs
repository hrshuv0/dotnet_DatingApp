using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Helpers.Params;
using DatingApp.API.Helpers.PSF;
using DatingApp.API.Models;

namespace DatingApp.API.Data.Services
{
    public interface IDatingRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<User> GetUser(int id);
        Task<PageList<User>> GetUsers(UserParams userParams);
        Task<bool> SaveAll();
        Task<Photo> GetPhoto(int id);
        Task<Photo> GetMainPhotoForUser(int userId);
        Task<Like> GetLike(int userId, int recipientId);
        Task<Message> GetMessage(int id);
        Task<PageList<Message>> GetMessagesForUser(MessageParams messageParams);
        Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId);
    }
}