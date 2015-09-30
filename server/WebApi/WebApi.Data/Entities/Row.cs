using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WebApi.Data.Entities
{
    public class Row
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Number { get; set; }
        public IEnumerable<Cell> Cells { get; set; }
    }
}