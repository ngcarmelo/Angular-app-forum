//Import router module
import { ModuleWithProviders } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

//Import components
import {LoginComponent } from './components/login/login.component';
import {RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { TopicsComponent } from './components/topics/topics.component';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';


//Services
import { UserGuard} from './services/user.guard';
import { NoIdentityGuard} from './services/no.identity.guard';


//Array routes
const appRoutes: Routes =[
{ path: '', component: HomeComponent},
{ path: 'home', component: HomeComponent},
{ path: 'login',  canActivate: [NoIdentityGuard], component: LoginComponent},
{ path: 'signup',  canActivate: [NoIdentityGuard], component: RegisterComponent},
{ path: 'settings',canActivate: [UserGuard] , component: UserEditComponent},
{ path: 'topics', component: TopicsComponent},
{ path: 'topics/:page', component: TopicsComponent},
{ path: 'topic/:id', component: TopicDetailComponent},
{ path: 'users', component: UsersComponent},
{ path: 'profile/:id', component: ProfileComponent},
{ path: 'search/:search', component: SearchComponent},
{ path: '**', component: HomeComponent}
];

//Export configuration
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);