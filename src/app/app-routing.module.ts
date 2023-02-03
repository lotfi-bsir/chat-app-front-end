import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {AuthComponent} from './auth/auth.component';
import {SignupComponent} from './signup/signup.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {AuthGardService} from './auth-gard.service';
import {ChatComponent} from './chat/chat.component';
import {AuthGuardLoginService} from './auth-guard-Login.service';

const appRoutes: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [AuthGardService], children: [
      {
        path: 'contact/:id', component: ChatComponent, data: {
          reuse: false
        }
      }
    ]
  },
  {path: 'auth', component: AuthComponent, canActivate: [AuthGuardLoginService]},
  {path: 'signup', component: SignupComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
