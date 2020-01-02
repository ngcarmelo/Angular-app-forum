import { Injectable } from '@angular/core'; //to be able to use this service in our components
import { HttpClient, HttpHeaders } from '@angular/common/http'; //to be able to do http request
import { Observable } from 'rxjs';  //to be able to receive data from request http
import { Comment } from '../models/comment';
import { global } from './global';



@Injectable()
export class CommentService{
	public url: string;
	public identity;
	public token;
	constructor(private _http: HttpClient){
		this.url = global.url;
	}

	
	add(token, comment, topicId): Observable <any>{
	
		let params = JSON.stringify(comment);
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
		.set('Authorization', token);
		
		return this._http.post(this.url+'comment/topic/'+topicId, params, {headers: headers});
	}
		
	delete(token, topicId, commentId): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
		.set('Authorization', token);
		
		return this._http.delete(this.url+'comment/'+topicId+'/'+commentId,  {headers: headers});
	}

	

}