import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-sent-message',
  templateUrl: './sent-message.component.html',
  styleUrls: ['./sent-message.component.css']
})
export class SentMessageComponent {
  @Input() sendMessage: {
    message: string,
    id: string,
    time: string
  };

}
