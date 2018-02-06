import { Comment } from "./comment";

export class Idea{

    id : number;
    text : string;
    dateIdea : any;
    accepted : boolean;
    voteaverage : number;
    votecounter : number;
    comlist : Comment[];

    constructor(sms : string){ this.text = sms; }
}