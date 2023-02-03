import {Component, OnDestroy, OnInit} from '@angular/core';
import {faPaperclip, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {ContactService} from '../contact/contact.service';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {SharedServiceService} from '../shared-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ContactService]
})
export class ChatComponent implements OnInit, OnDestroy {
  faPaperClip = faPaperclip;
  logout = faSignOutAlt;
  username = '';
  avatar = '';
  messageToSend: string;
  id;
  messages: any;
  private idSubscription: any;
  private querySubscription: any;

  constructor(private http: HttpClient,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private sharedService: SharedServiceService) {
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
    this.idSubscription.unsubscribe();
  }

  ngOnInit() {
    this.querySubscription = this.route.queryParams.subscribe((query) => {
      this.username = query['name'];
      this.avatar = query['avatar'];
    });
    this.idSubscription = this.route.params.subscribe((param) => {
      this.id = param['id'];
      this.getMessages();
    });
  }


  onLogout() {
    this.authService.logOut();
  }

  sendMessage() {
    if (!this.messageToSend || this.messageToSend.trim().length === 0) { return; }
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    this.http.post('http://localhost:8080/api/chat/messages', {
      text: this.messageToSend,
      recipient: {
        id: this.id
      }
    }, {headers}).subscribe(res => {
      this.sharedService.emitButtonClicked();
      this.getMessages();
      this.messageToSend = '';
    }, error => console.log(error));
  }

  getMessages() {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    this.http.get<any>(`http://localhost:8080/api/chat/conversation/${this.id}`, {headers}).subscribe(res => {
      const getMessages = res.messages;
      this.messages = getMessages.map((item) => {
        return {
          message: item.text,
          id: item.sender.id,
          time: item.createdAt
        };
      });
    });
  }
}
