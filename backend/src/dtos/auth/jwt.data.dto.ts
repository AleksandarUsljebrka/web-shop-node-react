import { identity } from "rxjs";

export class JwtDataDto{
    role:'administrator' | 'user';
    id:number;
    identity:string;
    exp:number;
    ua:string;
    ip:string;
    
    toPlainObject(){
        return {
            role:this.role,
            id:this.id,
            identity:this.identity,
            exp:this.exp,
            ua:this.ua,
            ip:this.ip
        }
    }
}