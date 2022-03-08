import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-chat-dialog',
  templateUrl: './new-chat-dialog.component.html',
  styleUrls: ['./new-chat-dialog.component.scss']
})
export class NewChatDialogComponent implements OnInit {

  name: FormControl = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }

}
