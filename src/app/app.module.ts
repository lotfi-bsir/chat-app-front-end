import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ContactComponent} from './contact/contact.component';
import {ReceivedMessageComponent} from './received-message/received-message.component';
import {SentMessageComponent} from './sent-message/sent-message.component';
import {AuthComponent} from './auth/auth.component';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {SignupComponent} from './signup/signup.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {HttpClientModule} from '@angular/common/http';
import {ChatComponent} from './chat/chat.component';
import {AlertComponent} from './alert/alert.component';
import {PlaceholderDirective} from './placeholder.directive';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    ReceivedMessageComponent,
    SentMessageComponent,
    AuthComponent,
    HomeComponent,
    SignupComponent,
    NotFoundComponent,
    ChatComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  imports: [
    FontAwesomeModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AlertComponent
  ]
})
export class AppModule {
}

