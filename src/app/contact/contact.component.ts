import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {IContact} from './contact';
import {ContactService} from './contact.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedServiceService} from '../shared-service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {
  buttonClicked: any;
  contacts: IContact[];
  newContacts;
  filteredContacts: IContact[] = [];
  firstContact;

  constructor(private _contactService: ContactService,
              private http: HttpClient,
              private route: Router,
              private sharedService: SharedServiceService,
              private changeDetector: ChangeDetectorRef,
              private router: ActivatedRoute) {
    this.contactFilter = '';
  }

  _contactFilter: string;

  get contactFilter() {
    return this._contactFilter;
  }

  set contactFilter(newValue: string) {
    this._contactFilter = newValue;
    this.filteredContacts = this.contactFilter ? this.performFilter(this.contactFilter) : this.contacts;
  }

  ngOnDestroy(): void {
    this.buttonClicked.unsubscribe();
  }

  performFilter(filterBy: string): IContact[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.contacts.filter(
      (contact: IContact) => contact.name.toLocaleLowerCase().indexOf(filterBy) > -1
    );
  }

  ngOnInit() {
    this.buttonClicked = this.sharedService.buttonClicked$.subscribe(() => {
      this.getContacts();
    });
    this.getContacts();
  }

  chargeFirstChat(contact) {
    this.route.navigate(['/contact', contact.id], {
      queryParams: {
        name: contact.name, avatar: contact.avatar
      }
    });
  }

  getContacts() {
    this._contactService.getAllContacts().subscribe(res => {
      this.newContacts = res;
      this.contacts = this.newContacts.map(item => {
        let avatar;
        if (item.userDto.photo.fileUrlType === 'ABSOLUTE') {
          avatar = item.userDto.photo.fileUrl;
        } else {
          avatar = 'http://localhost:8080' + item.userDto.photo.fileUrl;
        }
        return {
          'id': item.userDto.id,
          'avatar': avatar,
          'name': item.userDto.firstName + ' ' + item.userDto.lastName,
          'messages': JSON.stringify(item.lastMessage) === '{}' ? 'no message' : item.lastMessage.text,
          'time': JSON.stringify(item.lastMessage) === '{}' ? null : item.lastMessage.createdAt,
          'status': item.userDto.id % 2 === 0 ? 'online' : 'offline'
        };
      });

      if (!this.filteredContacts) {
        this.filteredContacts = [];
      }
      this.filteredContacts.length = 0;
      this.filteredContacts.push(...this.contacts.slice().sort((a, b) => b.time.localeCompare(a.time)));
      this.changeDetector.detectChanges();
      this.firstContact = this.filteredContacts[0];
      if (Object.keys(this.router.snapshot.queryParams).length === 0) {
        this.chargeFirstChat(this.firstContact);
      }
    });
  }

}
