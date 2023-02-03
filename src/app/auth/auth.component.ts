import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {PlaceholderDirective} from '../placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  error = null;
  errorSubscription: any;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(private authService: AuthService) {
  }


  ngOnInit() {
  }

  onSubmit(authForm: NgForm): void {
    console.log(authForm.value);
  }

  Login(email: string, password: string) {
    this.authService.login(email, password);
    this.errorSubscription = this.authService.errorField.subscribe(res => {
      this.error = res;
    });
  }

  handleClose() {
    this.authService._errorField.next(null);
    this.errorSubscription.unsubscribe();
    this.error = null;
  }

}
