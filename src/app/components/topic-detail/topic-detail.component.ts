import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router'; //to redirect, get params from URL
import { Topic } from '../../models/topic';  //import topic model
import { TopicService} from '../../services/topic.service';
import { UserService} from '../../services/user.service';
import { Comment } from '../../models/comment';  //import topic model
import { CommentService} from '../../services/comment.service';
import { global } from '../../services/global';



@Component({
	selector: 'app-topic-detail',
	templateUrl: './topic-detail.component.html',
	styleUrls: ['./topic-detail.component.css'],
	providers:[TopicService, UserService, CommentService]   
})
export class TopicDetailComponent implements OnInit {

	public topic: Topic;
	public comment: Comment;
	public identity;
	public token;
	public status;
	public url;


	constructor(
		private _topicService: TopicService,
		private _userService: UserService,
		private _commentService: CommentService,
		private _router: Router, //necessary to redirect
		private _route: ActivatedRoute ) //necessary to get params from URL
	{
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.comment = new Comment('','','',this.identity._id);
		this.url = global.url;

	}

	ngOnInit() {
		this.getTopic();
	}

	getTopic(){
		this._route.params.subscribe(params=>{
			let id = params['id'];
			this._topicService.getTopic(id).subscribe(
				response =>{
					if(response.topic){  				
						this.topic = response.topic;
						//	console.log(response.topic);
					}else{
						this._router.navigate(['/home']);
					}
				},
				error =>{
					console.log(error);
				}
				);
		});
	}

	onSubmit(form){
		this._commentService.add(this.token, this.comment, this.topic._id).subscribe(
			response=>{
				if(!response.topic){
					this.status = 'error';
				}else{
					this.status = 'success';
					this.topic = response.topic;
					form.reset();
				}
			},
			error =>{
				this.status = 'error';
				console.log(error);
			}
			);
	}

	deleteComment(id){
		this._commentService.delete(this.token, this.topic._id, id).subscribe(
			response=>{
				if(!response.topic){
					this.status = 'error';
				}else{
					this.status = 'success';
					this.topic = response.topic;

				}
			},
			error =>{
				this.status = 'error';
				console.log(error);
			}
			);
	}

}
