import { Injectable } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  data:BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public data$: Observable<number>;
  private _hubConnection : HubConnection;

  constructor() { 
    this.data$ = this.data.asObservable();
  }

  connect(){
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/chathub')
      .build();
    console.log("Connection built")
  }

  start(){
    this._hubConnection
      .start()
      .then(() => 
        {
          console.log('Connection started');              
          console.log("Adding listener");
          this.addListener(this.data);
        })
      .catch(err => console.log('Error while starting connection: ' + err))           
  }

  addListener(data:BehaviorSubject<number>){
    console.log("Listener starting");
    this._hubConnection.on('ReceiveMessage', function (user, message, counter) 
      {
        console.log("Counter: " + counter);
        data.next(counter);
      });
  }
}
