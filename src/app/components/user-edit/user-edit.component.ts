import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router'; // to be able to redirect
import { User } from '../../models/user';  //import user model
import { UserService} from '../../services/user.service';
import { global } from '../../services/global';


@Component({
	selector: 'app-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.css'],
	providers:[UserService]   
})
export class UserEditComponent implements OnInit {
	public page_title: string;
	public user: User;
	public identity;
	public token;
	public afuConfig; 
	public url;
	public status;


	constructor(
		private _userService: UserService,
		private _router: Router, //necessary to redirect
		private _route: ActivatedRoute  //necessary to redirect
		) {
		this.page_title = "User Settings"
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.user = this.identity;
		this.url = global.url;
		this.afuConfig = {
			multiple: false,
			formatsAllowed: ".jpg, .jpeg, .png, .gif",
			maxSize: "50",
			uploadAPI: {
				url: this.url+"upload-avatar", //url from back-end
				headers: { "Authorization": this.token}

			},
			theme: "attachPin",
			hideProgressBar: false,
			hideResetBtn: true,
			hideSelectBtn: false,
			attachPinText: 'Upload your pic',
			replaceTexts: {
				selectFileBtn: 'Select Files',
				resetBtn: 'Reset',
				uploadBtn: 'Upload',
				dragNDropBox: 'Drag N Drop',
				attachPinBtn: 'Upload your pic',
				afterUploadMsg_success: 'Successfully Uploaded !',
				afterUploadMsg_error: 'Upload Failed !'
			}

		}
	}

	ngOnInit() {
	}

	avatarUpload(data){
		let data_obj = JSON.parse(data.response);
		console.log(data_obj);
		this.user.image = data_obj.user.image;
		console.log(this.user);
	}

	onSubmit(form){
		this._userService.update(this.user).subscribe(

				response=>{

					if(!response.user){
						this.status = 'error';
						console.log('hola');
					}else{
						this.status = 'success';
						localStorage.setItem('identity', JSON.stringify(this.user));
						console.log(response.user);
					}
				},
				error =>{
					this.status = 'error';
					console.log(error);
				}
			);
	}

}
