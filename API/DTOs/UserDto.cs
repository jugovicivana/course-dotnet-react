using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UserDto
    {
        public string Email { get; set; } 
        //za prikaz na korisnickom interfejsu

        public string Token { get; set; }
        public BasketDto Basket { get; set; }

    }
}