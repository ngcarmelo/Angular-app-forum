import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; //to be able to use forms
import { HttpClientModule } from '@angular/common/http'; // to be able to do http request
import { NgxHighlightJsModule } from '@nowzoo/ngx-highlight-js'; // Module to hightlight text
//Import routing var
import { routing, appRoutingProviders } from './app.routing';
import { AngularFileUploaderModule } from "angular-file-uploader"; //file uploader

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { TopicsComponent } from './components/topics/topics.component';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';

//Import Module PanelModule
import { PanelModule } from './panel/panel.module';
//Import Moment
import { MomentModule } from 'angular2-moment';

//Services
import { UserService} from './services/user.service';
import { UserGuard} from './services/user.guard';
import { NoIdentityGuard} from './services/no.identity.guard';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserEditComponent,
    TopicsComponent,
    TopicDetailComponent,
    UsersComponent,
    ProfileComponent,
    SearchComponent
    
  ],
  imports: [
    BrowserModule,
    routing,  //import modules
    FormsModule, // import forms
    HttpClientModule, // import http request
    AngularFileUploaderModule, // file uploader
    PanelModule,
    MomentModule, 
    NgxHighlightJsModule.forRoot()
  ],
  providers: [
    appRoutingProviders, //import services
    UserGuard,
    UserService,
    NoIdentityGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
