using System.Text.Json;
using API.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {

        //da logujemo exception koji dobijemo
        //da vidimo jesmo li u production ili developer mode
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;


        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;

        }

        public async Task InvokeAsync(HttpContext context){
            try
            {
                await _next(context);
            }
            catch (Exception ex) 
            {
                //ako se desi neki izuzetak, ovdje treba da ga uhvatimo i nesto uradimo sa njim

                _logger.LogError(ex, ex.Message);
                context.Response.ContentType="application/json";
                context.Response.StatusCode=500;    //internal server error



                var response=new ProblemDetails
                {
                    Status=500,
                    Detail=_env.IsDevelopment()?ex.StackTrace.ToString():null,
                    Title=ex.Message,
                };

                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

                var json=JsonSerializer.Serialize(response, options);

                //ono sto cemo dobiti na klijentu ako se desi izuzetak
                await context.Response.WriteAsync(json);

            }
        }
    }
}