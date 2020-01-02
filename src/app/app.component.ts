import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService} from './services/user.service';
import { Router, ActivatedRoute, Params} from '@angular/router'; // to be able to redirect
import { global } from './services/global';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers:[UserService] 
})
export class AppComponent implements OnInit, DoCheck {
	public title = 'forum-angular';
	public identity;
	public token;
	public url;
	public search;


	constructor( 
		private _userService: UserService,
		private _router: Router, //necessary to redirect
		private _route: ActivatedRoute  //necessary to redirect
		){

		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = global.url;
	}

	ngOnInit(){
		//console.log(this.identity);
		//console.log(this.token);
	}

	ngDoCheck(){
		this.identity = this._userService.getIdentity();
	}

	logout(){
		localStorage.clear();
		this.identity = null;
		this.token = null;
		this._router.navigate(['/home']);
	}

	goSearch(){
		this._router.navigate(['search', this.search]);

	}
}
