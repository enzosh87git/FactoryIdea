import { Component, OnInit } from '@angular/core';
import { FactoryService } from '../../services/factory.service';

import { Idea } from '../../models/idea';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  currentidea : Idea;
  messageComment : string;
  logged:boolean;

  constructor( private factoryserv : FactoryService ) { }

  ngOnInit() { this.factoryserv.currentIdea.subscribe( idea => this.currentidea = idea ); 
               this.factoryserv.loggingStatus.subscribe( log => this.logged = log ); }

  sendComment(){ let com = new Comment(this.messageComment); this.messageComment='';
                 this.factoryserv.commentPost(com, this.currentidea.id)
                                 .subscribe( mess => { com = mess },
                                             err => { console.log(err) });   }
                                  
}
