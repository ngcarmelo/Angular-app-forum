import { Injectable } from '@angular/core'; //to be able to use this service in our components
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class NoIdentityGuard implements CanActivate{
	constructor(
		private _router: Router,
		private _userService: UserService

		){

	}

	canActivate(){
		let identity = this._userService.getIdentity();
		if(identity && identity.name){
			this._router.navigate(['']);
			return false;
		}else{
			return true;
		}

	}
}