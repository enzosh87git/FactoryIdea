import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from './models/user';
import { FactoryService } from './services/factory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  divnum : number;
  username:string;
  password:string;
  logged:boolean;

  constructor( private factoryserv : FactoryService ) { }

  ngOnInit() { this.showdiv(1); /*this.logged=false;*/
               this.factoryserv.loggingStatus.subscribe( log => this.logged = log ); }

  showdiv(div : number){ this.divnum = div; }
  
  checkauth(){ if ( !this.logged ) 
                    { let user = new User(this.username, this.password);
                      this.factoryserv.loginPost(user).subscribe( 
                              us => { user = us; alert("Login Success"); this.factoryserv.changeStatus(this.logged); },
                              err => { alert("Login failed"); this.username=""; this.password=""; console.log(err) } );
                    } 
               else               
                { this.factoryserv.logout(); 
                  this.username=""; this.password="";
                  alert("Logout Success");
                  this.factoryserv.changeStatus(this.logged);
                  this.showdiv(1);
                } 
  }
}
