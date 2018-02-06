export class User{

    id : number;
    username : string;
    password : string;
    userProfile : string;

    constructor(usn:string, psw:string){ this.username=usn; this.password=psw; }
}