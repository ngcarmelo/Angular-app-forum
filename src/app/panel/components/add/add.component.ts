import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router'; // to be able to redirect
import { Topic } from '../../../models/topic';  //import user model
import { UserService} from '../../../services/user.service';
import { TopicService} from '../../../services/topic.service';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.css'],
	providers:[UserService, TopicService]   
})
export class AddComponent implements OnInit {
	public page_title: string;
	public topic: Topic;
	public status: string;
	public identity;
	public token;

	constructor(
		private _userService: UserService,
		private _topicService: TopicService,
		private _router: Router, //necessary to redirect
		private _route: ActivatedRoute  //necessary to redirect
		) {
		this.page_title = 'Create new Post';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.topic = new Topic('','','','','','', this.identity._id, null);
		 }

	ngOnInit() {
		console.log(this._topicService.prueba());
	}

	onSubmit(form){
		this._topicService.addTopic(this.token, this.topic).subscribe(
			response =>{
				if(response.topic){
						this.status = 'success';
						this.topic = response.topic;
						this._router.navigate(['/panel']);
				}else{
					this.status = 'error';
				}

			},
			error =>{
				this.status = 'error';
				console.log(error);
			});
	}
}
