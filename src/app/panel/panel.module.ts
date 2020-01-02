//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; //to be able to use forms
import { HttpClientModule } from '@angular/common/http'; // to be able to do http request

//Import routing 
import { PanelRoutingModule } from './panel-routing.module';

//Components
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';

//Import Moment
import { MomentModule } from 'angular2-moment';


//Services
import { UserService} from '../services/user.service';
import { UserGuard} from '../services/user.guard';


//NgModule

@NgModule({
	declarations: [
	MainComponent,
	ListComponent,
	AddComponent,
	EditComponent	

	],
	imports: [
	BrowserModule,  
	FormsModule, // import forms
	HttpClientModule, // import http request
	PanelRoutingModule, //Routing
	MomentModule

	],
	exports: [
	MainComponent,
	ListComponent,
	AddComponent,
	EditComponent
	],
	providers:[
	UserService,
	UserGuard

	]
})

export class PanelModule { }