import { Component, OnInit } from '@angular/core';
import { Chat, ChatService } from '../shared/services/chat.service';
import { UserMessage } from '../shared/types/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  onlineUsers: number = 0;
  userMessage: string = "";
  defaultChat!: Chat; // Initialized in ngOnInit
  messages: Array<UserMessage> = [];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.defaultChat = this.chatService.subscribeToDefaultChannel();
    this.defaultChat.getChannelSubject().subscribe(({owner, userId, message}) => {
      // console.log("~~ In Home Component ~~");
      // console.log("owner", owner);
      // console.log("userId", userId);
      // console.log("message", message);
      this.messages.push({owner, userId, message});
    });
  }

  sendMessage(): void {
    this.defaultChat.sendMessage(this.userMessage);
    this.userMessage = "";
  }
}
