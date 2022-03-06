import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  chatType: FormControl = new FormControl('');
  message: FormControl = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }

  textOnEnter(e: KeyboardEvent): void {
    e.preventDefault();

    this.sendMessage();
  }

  sendMessage(): void {
    console.log('message sent');
    this.message.reset();
  }
}
