import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';  //import user model
import { UserService} from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'], 
  providers:[UserService]    
})
export class RegisterComponent implements OnInit {
	public page_title: string;
	public user: User;
	public status: string;

  constructor(
    private _userService: UserService //Inyect service as a property
    ) { 
  	this.page_title = 'Sign up';
  	this.user = new User('','','','','','','ROLE_USER');
  }

  ngOnInit() {
    //	console.log(this._userService.prueba());
  }

  onSubmit(form){
  	//console.log(this.user);
    this._userService.register(this.user).subscribe(
      response =>{

        if(response.user && response.user._id){
          
          this.status = 'success';
          form.reset;
        }else {
          this.status='error';
        }
      },

      error =>{
        console.log(error);
      }

      );
  }
}
