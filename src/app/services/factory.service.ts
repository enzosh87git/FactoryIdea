import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { error } from 'util';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Idea } from '../models/idea';
import { Comment } from '../models/comment';
import { User } from '../models/user';

@Injectable()
export class FactoryService {

  private ideaAddress = 'http://localhost:8080/IdeasFactory/idea';
  private commentAddress = 'http://localhost:8080/IdeasFactory/comment/';
  private authAddress = 'http://localhost:8080/IdeasFactory/';
  
  private selectedIdea = new BehaviorSubject<Idea>( new Idea("default") );
  private logged = new BehaviorSubject<boolean>( false );
  currentIdea = this.selectedIdea.asObservable();
  loggingStatus = this.logged.asObservable();

  constructor( private http : Http ) { }

  ideaList(): Observable<Idea[]>{
    return this.http.get(this.ideaAddress)
                    .map( (res:Response) => res.json() )
                    .catch( (error:any) => Observable.throw(error.json().error || 'Server error') )
  }

  ideaPost(idea:Idea): Observable<Idea>{
    return this.http.post(this.ideaAddress,idea)
                    .map( (res:Response) => res.json() )
                    .catch( (error:any) => Observable.throw(error.json().error || 'Server error') )                                                
  }

  commentPost(comment:Comment, id:number): Observable<Comment>{
    return this.http.post(this.commentAddress+id,comment)
                    .map( (res:Response) => res.json() )
                    .catch( (error:any) => Observable.throw(error.json().error || 'Server error') )                                                
  }

  selIdea(idea:Idea){ this.selectedIdea.next(idea); }
  changeStatus(log:boolean) { this.logged.next(!log); }

  loginPost(user:User): Observable<User>{
    return this.http.post(this.authAddress+"login",user)
                    .map( (res:Response) => res.json() )
                    .catch( (error:any) => Observable.throw(error.json().error || 'Server error') )                                                
  }

  logout() { this.http.get(this.authAddress+"logout")
                      .map( (res:Response) => {res.json() } )
                      .catch( (error:any) => Observable.throw(error.json().error || 'Server error') )
  }

  ideaDelete(id:number): Observable<Idea>{
    return this.http.delete(this.ideaAddress+"/"+id)
                    .map( (res:Response) => res.json() )
                    .catch( (error:any) => Observable.throw(error.json().error || 'Server error') )
  }
}
