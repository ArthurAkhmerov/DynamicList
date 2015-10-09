using System.Collections.Generic;

namespace Core.Common
{
    public class OperationResult
    {
        public bool Success { get; set; }
        public List<string> MessageList { get; private set; }

        public OperationResult()
        {
            MessageList = new List<string>();
            Success = true;
        }

        public void AddMessage(string msg)
        {
            MessageList.Add(msg);
        }
    }
}