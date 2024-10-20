export class LoginInfoAdministratorDto{
    administratorId:number;
    username:string;
    token:string;
    
    constructor(id:number, uname:string, token:string){
        this.administratorId = id;
        this.username = uname;
        this.token = token;
    }
}