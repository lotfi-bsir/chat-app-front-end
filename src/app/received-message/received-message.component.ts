import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-received-message',
  templateUrl: './received-message.component.html',
  styleUrls: ['./received-message.component.css']
})
export class ReceivedMessageComponent {
  @Input() receivedMessage: {
    message: string,
    id: string,
    time: string
  };

}

