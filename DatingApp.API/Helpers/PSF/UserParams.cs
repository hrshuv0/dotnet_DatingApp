namespace DatingApp.API.Helpers.PSF
{
    public class UserParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 10;
        public int PageSize 
        {
            get => pageSize;
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }

        public int UserId { get; set; }
        public string Gender { get; set; }
        public int MinAge { get; set; } = 16;
        public int MaxAge { get; set; } = 99;
        public string OrderBy { get; set; }


    }
}