import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  public _errorField = new BehaviorSubject(null);
  errorField = this._errorField.asObservable();
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    this._isLoggedIn$.next(!!token);
  }

  ngOnInit(): void {

  }

  login(email: string, password: string) {
    this.http.post<{ token: string }>('http://localhost:8080/api/auth/login', {
      email: email,
      password: password
    }).subscribe({
      next: (res) => {
        if (res.token) {
          const array = res.token.split(' ');
          const TOKEN = array[1];
          localStorage.setItem('token', TOKEN);
          this._isLoggedIn$.next(true);
          this._errorField.next(null);
          this.router.navigate(['/']);
        }
      },
      error: err => {
        switch (err.status) {
          case 400 :
            this._errorField.next('bad credentials');
            break;
          default :
            this._errorField.next(err.message);
        }
        localStorage.clear();
      }
    });

  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/auth']);
  }

  signIn(user) {
    this.http.post<{ token: string }>('http://localhost:8080/api/auth/registre', user).subscribe(res => {
      const array = res.token.split(' ');
      const TOKEN = array[1];
      localStorage.setItem('token', TOKEN);
      this._isLoggedIn$.next(true);
      console.log('sign up success');
      this.router.navigate(['/']);
    });
  }
}
