# AngularSignalRApp
A solution with a SignalR client, simple chat and an angular website to display current amount of messages.

The solution consists of 2 projects: SignalRChat and Angular.


# SignalRChat
SignalRChat project incorperates Razor pages for a web functionality and has a very simple single page user interface. It also includes a SignalR Hub at the */chathub* endpoint.

At the press of the send message button an javascript function is started and invokes the method defined in the ChatHub class. On that method the ChatHub proceeds to inform all clients connected to the current hub about the information while also increasing an internal counter that marks how many messages have been sent on the Chat App.

The chat also via the SignalR client will listen for the method invoked when the send button is clicked and will proceed to process the information recieved from the SignalR client and append it to a list to display the conversation accross multiple clients keeping them all up to date.

# Angular

This frontend application consists of 2 components and a service. The components are the default "app" component and a custom component named "counter" designed for reading and displaying datastreams from the custom signal-r service.

Not only does the counter component read the datastream that provides the counter value from the service, on initialisation of the component via dependency injection it tells the signal-r service to build a connection with the SignalR client and proceed to connect to it. 

The signal-r service creates an behaviour subject and an observable object on top of that subject. It contains method for building a connection to the SignalR client, connecting to said client and adding a listener for a method invoked by the SignalR client. It initialsies this listener as part of the connection method.
