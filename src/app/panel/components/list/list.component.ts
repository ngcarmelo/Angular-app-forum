import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router'; // to be able to redirect
import { Topic } from '../../../models/topic';  //import user model
import { UserService} from '../../../services/user.service';
import { TopicService} from '../../../services/topic.service';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css'],
	providers:[UserService, TopicService]   
})
export class ListComponent implements OnInit {
	public page_title: string;
	public topics: Array<Topic>;
	public status: string;
	public identity;
	public token;


	constructor(
		private _userService: UserService,
		private _topicService: TopicService,
		private _router: Router, //necessary to redirect
		private _route: ActivatedRoute  //necessary to redirect
		) { 
		this.page_title = 'My Posts';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		

	}

	ngOnInit() {
		this.getTopics();
	}

	getTopics(){
		var userId = this.identity._id
		this._topicService.getTopicsByUser(userId).subscribe(
			response =>{
				if(response.topics){
					this.status = 'success';
					this.topics = response.topics;

				}else{
					this.status = 'error';
				}

			},
			error =>{
				this.status = 'error';
				console.log(error);
			});
	}

	deleteTopic(id){
		this._topicService.delete(this.token, id).subscribe(
			response =>{
				this.getTopics();
			},
			error =>{
				console.log(error);
			}
			);
	}
}
