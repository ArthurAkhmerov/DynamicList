using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Core.Common;
using MongoDB.Bson;
using MongoDB.Driver.Builders;
using WebApi.Data;
using WebApi.Data.Entities;

namespace WebApi.Controllers
{
   public class RowsController : ApiController
    {
        private readonly IRowRepository _repo;

        public RowsController(IRowRepository repo)
        {
            _repo = repo;
        }

        public object Get()
        {
            return _repo.GetAll();
        }

        public HttpResponseMessage Get(string rowNumber)
        {
            var row = _repo.GetByRowNumber(rowNumber);

            if (row == null)
                return Request.CreateResponse(HttpStatusCode.NotFound);

            return Request.CreateResponse(HttpStatusCode.OK, row);
        }

        [HttpPost]
        public HttpResponseMessage Post([FromBody] Row rowToAdd)
        {
            var result = _repo.Add(rowToAdd);
            if (result.Success)
            {
                return Request.CreateResponse(HttpStatusCode.Created, rowToAdd);
            }
            else
            {
                var msg = String.Join(";", result.MessageList);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, msg);
            }
        }

        [HttpPut]
        [HttpPatch]
        public HttpResponseMessage Patch(string rowNumber, [FromBody] Row rowToUpdate)
        {
            var result = _repo.Update(rowNumber, rowToUpdate);
            if (result.Success)
            {
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else if (result.MessageList.Contains("Not found"))
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            else
            {
                var msg = String.Join(";", result.MessageList);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, msg);
            }
        }

        public HttpResponseMessage Delete(string rowNumber)
        {
            OperationResult result = _repo.DeleteByRowNumber(rowNumber);
            if (result.Success)
            {
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                var msg = String.Join("; ", result.MessageList);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, msg);
            }
        }
    }
}
