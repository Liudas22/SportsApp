using Newtonsoft.Json;

namespace SportsApp.API.ExceptionHandling
{
    public class ExceptionResponse
    {
        public int StatusCode { get; set; }

        public string Message { get; set; }
        public ExceptionResponse()
        {
        }

        public ExceptionResponse(int statusCode, string message)
        {
            StatusCode = statusCode;
            Message = message;
        }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
