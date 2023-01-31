using Microsoft.AspNetCore.Mvc.Filters;
using SportsApp.Domain.Exceptions;
using System.Net;

namespace SportsApp.API.ExceptionHandling
{
    public class ExceptionFilter : ExceptionFilterAttribute
    {
        public override async Task OnExceptionAsync(ExceptionContext context)
        {
            await HandleExceptionAsync(context);
        }
        private Task HandleExceptionAsync(ExceptionContext context)
        {
            var exceptionResponse = HandleException(context.Exception);
            context.HttpContext.Response.ContentType = "application/json";
            context.HttpContext.Response.StatusCode = exceptionResponse.StatusCode;
            context.ExceptionHandled = true;

            return context.HttpContext.Response.WriteAsync(exceptionResponse.ToString());
        }

        private static ExceptionResponse HandleException(Exception exception)
        {
            var httpStatusCode = HttpStatusCode.InternalServerError;
            if (exception.GetType() == typeof(ValidationException))
            {
                httpStatusCode = HttpStatusCode.BadRequest;
            }
            if (exception.GetType() == typeof(ConflictException))
            {
                httpStatusCode = HttpStatusCode.Conflict;
            }
            if (exception.GetType() == typeof(NotFoundException))
            {
                httpStatusCode = HttpStatusCode.NotFound;
            }

            var exceptionResponse = new ExceptionResponse
            {
                StatusCode = (int)httpStatusCode,
                Message = exception.Message
            };

            return exceptionResponse;
        }
    }
}
