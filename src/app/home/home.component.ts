import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  onlineUsers: number = 0;
  userMessage?: string;

  constructor() { }

  ngOnInit(): void {
  }

  sendMessage(): void {
    console.log('Message Sent: ', this.userMessage);
    this.userMessage = "";
  }
}
