using System;
using System.Linq;
using Core.Common;
using MongoDB.Driver.Builders;
using WebApi.Data.Entities;

namespace WebApi.Data
{
    public class RowRepository : IRowRepository
    {
        private DynamicListContext _ctx;

        public RowRepository(DynamicListContext ctx)
        {
            _ctx = ctx;
        }

        public object GetAll()
        {
            var rows = _ctx.Rows.FindAll();
            var listOfRows = rows.ToList();
            listOfRows = listOfRows.OrderBy(r => r.Number, new SemiNumericComparer()).ToList();

            return new
            {
                TotalCount = rows.Count(),
                Rows = listOfRows
            };
        }

        public Row GetByRowNumber(string rowNumber)
        {
            var row = _ctx.Rows.FindOne(Query.EQ("Number", rowNumber));
            return row;
        }

        public OperationResult Add(Row rowToAdd)
        {
            var result = new OperationResult();
            try
            {
                _ctx.Rows.Insert(rowToAdd);
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.AddMessage(ex.Message);
            }
            return result;
        }

        public OperationResult Update(string rowNumber, Row rowToUpdate)
        {
            var result = new OperationResult();
            try
            {

                var row = _ctx.Rows.FindOne(Query.EQ("Number", rowNumber));
                if (row == null)
                {
                    result.Success = false;
                    result.AddMessage(string.Format("Not found", rowNumber));
                    return result;
                }
                row.Cells = rowToUpdate.Cells;
                _ctx.Rows.Save(row);
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.AddMessage(ex.Message);
            }
            return result;

        }

        public OperationResult DeleteByRowNumber(string rowNumber)
        {
            var result = new OperationResult();
            try
            {
                _ctx.Rows.Remove(Query.EQ("Number", rowNumber));
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.AddMessage(ex.Message);
            }
            return result;
        }
    }
}