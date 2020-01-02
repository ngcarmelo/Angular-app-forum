import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router'; // to be able to redirect
import { Topic } from '../../../models/topic';  //import user model
import { UserService} from '../../../services/user.service';
import { TopicService} from '../../../services/topic.service';

@Component({
	selector: 'app-edit',
	templateUrl: '../add/add.component.html',
	styleUrls: ['./edit.component.css'],
	providers:[UserService, TopicService] 
})
export class EditComponent implements OnInit {
	public page_title: string;
	public topic: Topic;
	public status: string;
	public identity;
	public token;
	public is_edit;

	constructor(
		private _userService: UserService,
		private _topicService: TopicService,
		private _router: Router, //necessary to redirect
		private _route: ActivatedRoute  //necessary to redirect
		) {
		this.page_title = 'Edit  Post';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.topic = new Topic('','','','','','', this.identity._id, null);
		this.is_edit = true;
	}

	ngOnInit() {
		this.getTopic();
	}

	getTopic(){
		//get parameter from URL
		this._route.params.subscribe(params=>{
			let id = params['id'];

			this._topicService.getTopic(id).subscribe(
				response =>{
					if(!response.topic){
						this._router.navigate(['/panel']);
					}else{
						this.topic = response.topic;
					}
				}, error=>{
					this.status = 'error';
					console.log(error);
				});		
		});
	}

	onSubmit(){
		var id = this.topic._id;
		this._topicService.update(this.token, id, this.topic).subscribe(
			response =>{
				if(response.topic){
					this.status = 'success';
					this.topic = response.topic;
				}else{
					this.status = 'error';
				}
			}, 
			error=>{
				this.status = 'error';
				console.log(error);
			}
			);
	}

	
}
