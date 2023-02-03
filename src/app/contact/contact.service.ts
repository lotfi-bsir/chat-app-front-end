import {Injectable} from '@angular/core';
import {IContact} from './contact';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) {
  }

  // getContacts(): IContact[] {
  //   return [
  //     {
  //       'avatar': 'https://bootdey.com/img/Content/avatar/avatar1.png',
  //       'name': 'John Doe',
  //       'messages': ['First Message', 'Previous Message'],
  //       'time': '10:20 PM',
  //       'status': 'online'
  //     },
  //     {
  //       'avatar': 'https://bootdey.com/img/Content/avatar/avatar2.png',
  //       'name': 'Mark Doe',
  //       'messages': ['First Message', 'Previous Message'],
  //       'time': '10:10 PM',
  //       'status': 'offline'
  //     },
  //     {
  //       'avatar': 'https://bootdey.com/img/Content/avatar/avatar3.png',
  //       'name': 'Jean Doe',
  //       'messages': ['First Message', 'Previous Message'],
  //       'time': '10:00 PM',
  //       'status': 'online'
  //     }
  //   ];
  // }

  getAllContacts() {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get('http://localhost:8080/api/users', {
      headers
    });
  }
}
