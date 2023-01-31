using Newtonsoft.Json;

namespace SportsApp.API.ExceptionHandling
{
    public class ExceptionResponse
    {
        public ExceptionResponse()
        {
        }

        public ExceptionResponse(int statusCode, string message)
        {
            StatusCode = statusCode;
            Message = message;
        }

        public int StatusCode { get; set; }

        public string Message { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
