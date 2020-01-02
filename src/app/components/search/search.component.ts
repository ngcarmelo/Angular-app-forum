import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router'; //to redirect, get params from URL
import { Topic } from '../../models/topic';  //import topic model
import { TopicService} from '../../services/topic.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css'],
	providers:[TopicService]   
})
export class SearchComponent implements OnInit {
	public page_title: string;		
	public topics: Array<Topic>;		


	constructor(
		private _topicService: TopicService,
		private _router: Router, //necessary to redirect
		private _route: ActivatedRoute ) //necessary to get params from URL
	{
		this.page_title = 'Search: ';

	}


	ngOnInit() {
		this._route.params.subscribe(params =>{
			var search = params['search'];
			this.page_title = this.page_title + ' ' + search;
			this.getTopics(search);

		});

	}

	getTopics(search){
		this._topicService.searchTopic(search).subscribe(
			response=>{
				if(response.topics){
					this.topics = response.topics;
					console.log(this.topics);
				}

			},
			 error=>{
			 	console.log(error);
			 }
			 );

	}

}