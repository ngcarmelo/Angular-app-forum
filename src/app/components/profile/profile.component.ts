import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router'; // to be able to redirect and get url Params
import { UserService} from '../../services/user.service';
import { User } from '../../models/user';  //import user model
import { TopicService} from '../../services/topic.service';
import { Topic } from '../../models/topic';  //import topic model
import { global } from '../../services/global';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
	providers:[UserService, TopicService]   
})
export class ProfileComponent implements OnInit {
	public url: string;	
	public user: User;
	public topics: Topic[];
	public identity;
	public status: string;

	constructor(
		private _userService: UserService,
		private _topicService: TopicService,
		private _router: Router, // to redirect
		private _route: ActivatedRoute  //get params from URL
		) {
		this.url = global.url;
		
	}

	ngOnInit() {
		this._route.params.subscribe(params =>{
			var userId = params['id'];
			
			this.getUser(userId);
			this.getTopics(userId);
		});
		
	}

	getUser(userId){
		this._userService.getUser(userId).subscribe(
			response =>{
				if(response.user){
					this.user = response.user;
				}
			},
			error =>{
				console.log(error);
			}
			);
	}

	getTopics(userId){		
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

}
