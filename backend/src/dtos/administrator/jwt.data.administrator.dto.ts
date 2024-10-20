export class JwtDataAdministratorDto{
    administratorId:number;
    username:string;
    exp:number;
    ua:string;
    ip:string;
    
    toPlainObject(){
        return {
            administratorId:this.administratorId,
            username:this.username,
            exp:this.exp,
            ua:this.ua,
            ip:this.ip
        }
    }
}