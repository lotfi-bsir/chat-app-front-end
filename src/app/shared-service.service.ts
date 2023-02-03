import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  private buttonClicked = new Subject<void>();
  buttonClicked$ = this.buttonClicked.asObservable();

  constructor() {}

  emitButtonClicked() {
    this.buttonClicked.next();
  }
}
