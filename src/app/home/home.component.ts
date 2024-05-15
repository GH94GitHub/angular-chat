import { Component, OnInit } from '@angular/core';
import { ChatService } from '../shared/services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  onlineUsers: number = 0;
  userMessage: string = "";

  constructor(private chat: ChatService) { }

  ngOnInit(): void {

  }

  sendMessage(): void {

    this.chat.publishMessage("", this.userMessage);
    this.userMessage = "";
  }
}
