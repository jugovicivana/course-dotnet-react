using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController:BaseAPIController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
            //404
        }
         [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            // return BadRequest("This is a bas request!");
            //400
            return BadRequest(new ProblemDetails{Title="This is a bad request!"});
        } 
        [HttpGet("unauthorized")]
        public ActionResult GetUnauthorized()
        {
            return Unauthorized();
            //401
        }
         [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem1", "This is the first error");
            ModelState.AddModelError("Problem2", "This is the second error");

            return ValidationProblem();
            //400

        }

        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            //500
           throw new Exception("This is a server error");

        }
    }
}