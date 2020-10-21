using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        private static int counter = 0;
        public async Task TestMessage(string user, string message)
        {
            counter++;
            await Clients.All.SendAsync("ReceiveMessage", user, message, counter);
        }
    }
}
