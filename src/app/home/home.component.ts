import { Component, OnInit } from '@angular/core';
import { ChatService } from '../shared/services/chat.service';
import { UserMessage } from '../shared/types/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  onlineUsers: number = 0;
  userMessage: string = "";
  defaultChannelMessages: Array<UserMessage> = [];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.subscribeToDefaultChannel().subscribe(({userId, message}) => {
      console.log("~~ Inside Home component ~~");
      if(userId !== "" && message !== "") {
        console.log(userId);
        console.log(message);
        this.defaultChannelMessages.push({userId, message});
      }
      console.log("defaultChannelMessages", this.defaultChannelMessages);
    });
  }

  sendMessage(): void {
    this.chatService.sendMessage("", this.userMessage);
    this.userMessage = "";
  }
}
