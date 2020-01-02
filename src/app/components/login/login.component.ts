import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router'; // to be able to redirect
import { User } from '../../models/user';  //import user model
import { UserService} from '../../services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	providers:[UserService]   
})
export class LoginComponent implements OnInit {
	public page_title: string;
	public user: User;
	public status: string;
	public identity;
	public token;

	constructor(
		private _userService: UserService,
		private _router: Router, //necessary to redirect
		private _route: ActivatedRoute  //necessary to redirect
		) {
		this.page_title = 'Log in';
		this.user = new User('','','','','','','ROLE_USER');
	}

	ngOnInit() {
	}

	onSubmit(form){
		//console.log(this.user);

		//Get  object user login
		this._userService.login(this.user).subscribe(
			response =>{
				if(response.user && response.user._id){
					//console.log(response);
					//save user object in 'identity' property
					this.identity = response.user;
					localStorage.setItem('identity', JSON.stringify(this.identity));

					//Get token
					this._userService.login(this.user, true).subscribe(
						response =>{
							if(response.token){
								//Save user-token in 'token' property
							this.token = response.token;
							localStorage.setItem('token', this.token);
							this.status = 'success';
							this._router.navigate(['/home']);

							}else{
								this.status = 'error';
							}
						},

						error =>{
							this.status = 'error';
							console.log(error);
						}
						);
				}else{
					this.status = 'error';
				}
				form.reset();
			},

			error =>{
				this.status = 'error';
				console.log(error);
			}
			);


	}
}
