import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NewChatDialogComponent } from '../shared/dialogs/new-chat-dialog/new-chat-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  chatType: FormControl = new FormControl('');
  message: FormControl = new FormControl('');

  constructor(private dialog: MatDialog) { }

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

  newChatDialog(): void {
    const dialogRef = this.dialog.open(NewChatDialogComponent, {
      height: '220px'
    });

    dialogRef.afterClosed().subscribe( name => {
      console.log(`User started chat with ${name}.`);
    })
  }
}
