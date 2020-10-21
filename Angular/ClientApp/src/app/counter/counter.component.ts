import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../signal-r.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  counter:number;

  constructor(public signalRService:SignalRService){}

  ngOnInit(): void {
    console.log("Building connection");
    this.signalRService.connect();
    console.log("Starting connection");
    this.signalRService.start();
    this.signalRService.data$.subscribe(
      (counter:number) => {
        this.counter = counter;
      }
    )
  }

}
