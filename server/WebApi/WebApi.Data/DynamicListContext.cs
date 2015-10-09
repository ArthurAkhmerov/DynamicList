using MongoDB.Driver;
using WebApi.Data.Entities;
using WebApi.Data.Properties;

namespace WebApi.Data
{
    public class DynamicListContext
    {
        private MongoDatabase Database;

        public DynamicListContext()
        {
            var client = new MongoClient(Settings.Default.WebApiConnectionString);
            var server = client.GetServer();
            Database = server.GetDatabase(Settings.Default.WebApiDatabaseName);
        }

        public MongoCollection<Row> Rows
        {
            get { return Database.GetCollection<Row>("rows"); }
        }
    }
}