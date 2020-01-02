import { Injectable } from '@angular/core'; //to be able to use this service in our components
import { HttpClient, HttpHeaders } from '@angular/common/http'; //to be able to do http request
import { Observable } from 'rxjs';  //to be able to receive data from request http
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService{
	public url: string;
	public identity;
	public token;
	constructor(private _http: HttpClient){
		this.url = global.url;
	}

	prueba(){
		return "Hello World from an Angular Service";
	}

	register(user): Observable <any>{
		//Turn 'User Object' into a json string
		let params = JSON.stringify(user);

		//Define Headers
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		//Request
		return this._http.post(this.url+'register', params, {headers: headers});

	}

	login(user, gettoken = null): Observable <any>{

		//Check if we get gettoken
		if(gettoken != null){
			user.gettoken = gettoken;
		}		

		let params = JSON.stringify(user);		
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.post(this.url+'login', params, {headers: headers});

	}

	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity'));
		if(identity && identity != null &&  identity != undefined &&  identity != "undefined"){
			this.identity =  identity;
		}else { this.identity = null}
		
		return this.identity;
	}

	getToken(){
		let token = localStorage.getItem('token');
		if(token && token != null &&  token != undefined &&  token != "undefined"){
			this.token =  token;
		}else { this.token = null}

		return this.token;

	}


	update(user): Observable<any>{

		let params = JSON.stringify(user);		
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());

		return this._http.put(this.url+'user/update', params, {headers: headers});

	}

	getUsers(): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.get(this.url+'users', {headers: headers});
	}

	getUser(userId): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.get(this.url+'user/'+userId, {headers: headers});
	}

}