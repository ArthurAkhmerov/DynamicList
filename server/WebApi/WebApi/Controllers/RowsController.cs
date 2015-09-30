using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using MongoDB.Bson;
using MongoDB.Driver.Builders;
using WebApi.Data;
using WebApi.Data.Entities;
using WebApi.Helpers;

namespace WebApi.Controllers
{
    public class RowsController : ApiController
    {
        public readonly DynamicListContext Context = new DynamicListContext();

        public RowsController()
        {

        }

        public object Get()
        {
            var rows = Context.Rows.FindAll();
            var listOfRows = rows.ToList();
            listOfRows = listOfRows.OrderBy(r => r.Number, new SemiNumericComparer()).ToList();

            return new
            {
                TotalCount = 10,
                Rows = listOfRows
            };
        }

        public HttpResponseMessage Get(string rowNumber)
        {
            var row = Context.Rows.FindOne(Query.EQ("Number", rowNumber));

            if (row == null)
                return Request.CreateResponse(HttpStatusCode.NotFound);

            return Request.CreateResponse(HttpStatusCode.OK, row);
        }

        [HttpPost]
        public HttpResponseMessage Post([FromBody] Row model)
        {
            try
            {
                var row = model;
                Context.Rows.Insert(row);

                return Request.CreateResponse(HttpStatusCode.Created, row);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPut]
        [HttpPatch]
        public HttpResponseMessage Patch(string rowNumber, [FromBody] Row model)
        {
            try
            {
                var row = Context.Rows.FindOne(Query.EQ("Number", rowNumber));
                if(row == null) return Request.CreateResponse(HttpStatusCode.NotFound);

                row.Cells = model.Cells;
                Context.Rows.Save(row);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        public HttpResponseMessage Delete(string rowNumber)
        {
            try
            {
                Context.Rows.Remove(Query.EQ("Number", rowNumber));
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}
