using Core.Common;
using WebApi.Data.Entities;

namespace WebApi.Data
{
    public interface IRowRepository
    {
        object GetAll();
        Row GetByRowNumber(string rowNumber);
        OperationResult Add(Row rowToAdd);
        OperationResult Update(string rowNumber, Row rowToUpdate);
        OperationResult DeleteByRowNumber(string rowNumber);
    }
}