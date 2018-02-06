import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { IdeaComponent } from './components/idea/idea.component';
import { CommentComponent } from './components/comment/comment.component';
import { FactoryService } from './services/factory.service';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    IdeaComponent,
    CommentComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [FactoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
