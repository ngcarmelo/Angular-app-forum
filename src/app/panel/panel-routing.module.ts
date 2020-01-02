//Import router module
import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

//Import components
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';

//Services
import { UserGuard} from '../services/user.guard';


//Array routes
const panelRoutes: Routes =[
	{ path: 'panel', component: MainComponent, 
	canActivate: [UserGuard],
	children: [
		{ path: '', component: ListComponent},
		{ path: 'list', component: ListComponent},
		{ path: 'create', component: AddComponent},
		{ path: 'edit/:id', component: EditComponent}
	]
	}

];

@NgModule({
	imports: [
	RouterModule.forChild(panelRoutes)
	],
	exports: [ RouterModule
	]
})

//Export configuration
export class PanelRoutingModule { }
