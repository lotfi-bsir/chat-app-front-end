import {Component, OnInit} from '@angular/core';
import {faCommentAlt, faSearch, faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {

  faCommentDots = faCommentAlt;
  faUser = faUser;
  faSearch = faSearch;


  constructor() {
  }

  ngOnInit() {
  }
}
