import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router'; //to redirect, get params from URL
import { Topic } from '../../models/topic';  //import topic model
import { TopicService} from '../../services/topic.service';


@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
  providers:[TopicService]   

})
export class TopicsComponent implements OnInit {
		public page_title: string;		
		public topics: Array<Topic>;		
		public totalPages;
		public page;
		public next_page;
		public prev_page;
		public number_pages;

  constructor(
    private _topicService: TopicService,
		private _router: Router, //necessary to redirect
		private _route: ActivatedRoute ) //necessary to get params from URL
		 {
		 	this.page_title = 'Posts';

		  }

  ngOnInit() {
  	this._route.params.subscribe(params =>{
  		var page = +params['page'];
	if(!page || page == null || page == undefined){
		page = 1;
		this.prev_page = 1;
		this.next_page = 2;
	}

	this.getTopics(page);
  	});
  	
  }

  getTopics(page = 1){
  	this._topicService.getTopics(page).subscribe(
  		response =>{
  			//console.log(response.topics);
  			if(response.topics){
  				this.topics = response.topics;

  				// Paginate Navigation 
  				this.totalPages = response.totalPages;

  				 var number_pages = [];
  				 for(var i=1; i <= this.totalPages; i++){
  				 	number_pages.push(i);
  				 }
  				 this.number_pages = number_pages;

  				 if(page >=2){
  				 	this.prev_page = page-1;
  				 }else{
  				 	this.prev_page = 1;
  				 }

  				 if(page < this.totalPages){
  				 	this.next_page = page+1;
  				 }else{
  				 	this.next_page = this.totalPages;
  				 }


  			}else{
  				this._router.navigate(['/home']);
  			}
  		},
  		 error =>{
  		 	console.log(error);
  		 }
  		 );
  }

}
