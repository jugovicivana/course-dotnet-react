using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.RequestHelpers
{
    public class MetaData
    {
        public int CurrentPage { get; set; }  //trenutna stranica  
        public int TotalPages { get; set; } //ukupan broj stranica
        public int PageSize { get; set; }   //broj proizvoda na stranici
        public int TotalCount { get; set; } //ukupan broj proizvoda
    }
}