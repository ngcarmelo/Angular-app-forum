import { Injectable } from '@angular/core'; //to be able to use this service in our components
import { HttpClient, HttpHeaders } from '@angular/common/http'; //to be able to do http request
import { Observable } from 'rxjs';  //to be able to receive data from request http
import { User } from '../models/user';
import { global } from './global';



@Injectable()
export class TopicService{
	public url: string;
	public identity;
	public token;
	constructor(private _http: HttpClient){
		this.url = global.url;
	}

	prueba(){
		return "Hello World from an Angular Topic Service";
	}


	addTopic(token, topic): Observable <any>{
		//Turn 'User Object' into a json string
		let params = JSON.stringify(topic);

		//Define Headers
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
		.set('Authorization', token);

		//Request
		return this._http.post(this.url+'topic', params, {headers: headers});

	}

	getTopicsByUser(userId): Observable <any>{

		//Define Headers
		let headers = new HttpHeaders().set('Content-Type', 'application/json');							
		//Request
		return this._http.get(this.url+'user-topics/'+userId, {headers: headers});
	}

	getTopic(id): Observable <any>{

		//Define Headers
		let headers = new HttpHeaders().set('Content-Type', 'application/json');							
		//Request
		return this._http.get(this.url+'topic/'+id, {headers: headers});
	}

	update(token, id, topic): Observable <any>{
		//Turn 'User Object' into a json string
		let params = JSON.stringify(topic);

		//Define Headers
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
		.set('Authorization', token);

		//Request
		return this._http.put(this.url+'topic/'+id, params, {headers: headers});
	}

	delete(token, id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json')
		.set('Authorization', token);
		
		return this._http.delete(this.url+'topic/'+id,  {headers: headers});
	}

	getTopics(page = 1): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');			
		return this._http.get(this.url+'topics/'+page,  {headers: headers});
	}

	searchTopic(search): Observable<any>{
	
	let headers = new HttpHeaders().set('Content-Type', 'application/json');			
		return this._http.get(this.url+'search/'+search,  {headers: headers});
	}
}