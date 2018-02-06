import { Component, OnInit } from '@angular/core';
import { FactoryService } from '../../services/factory.service';
import { Idea } from '../../models/idea';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnInit {

  ideas: Idea[];
  messageIdea : string;
  selectedIdea :number;
  logged:boolean;

  constructor( private factoryserv : FactoryService ) { }

  ngOnInit() { this.listIdeas(); this.selectedIdea=0;
               this.factoryserv.loggingStatus.subscribe( log => this.logged = log );  }

  listIdeas() { this.factoryserv.ideaList().subscribe( ideas => { this.ideas = ideas },
                                                       err => { console.log(err) } );  
  }

  sendIdea(){ let sms = new Idea(this.messageIdea); this.messageIdea='';
              this.factoryserv.ideaPost(sms).subscribe( mess => { sms = mess; window.alert("Sending Success"); },
                                                        err => { console.log(err) })  
  }

  onSelect(idea : Idea){  if(idea.id == this.selectedIdea) { this.selectedIdea=0; }
                          else { this.factoryserv.selIdea(idea); 
                                 this.selectedIdea = idea.id; } 
  }

  delete(idea:Idea){ if (confirm("Are you sure to delete this Idea ?")) 
                        { this.factoryserv.ideaDelete(idea.id).subscribe( mess => { window.alert("Deleting Success"); 
                                                                                    this.ideas.splice(this.ideas.indexOf(idea),1) },
                                                                               err => { console.log(err) }) }                      
  }

}
