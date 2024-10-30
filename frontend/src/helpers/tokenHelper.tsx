import { jwtDecode, JwtPayload } from "jwt-decode";

interface TokenPayload extends JwtPayload {
    id?: string;
    username?: string;
    email?: string;
  }

export const saveToken = (token:string):void => {
    if (!token) {
      return;
    }
    window.localStorage.setItem('token', token);
  };
  
  export const removeToken = ():void => {
    window.localStorage.removeItem('token');
  };

  export const getToken = ():JwtPayload | null => {
    const token = window.localStorage.getItem('token');
  
    if (!token) {
      return null;
    }
  
    try {
      const decoded = jwtDecode<JwtPayload>(token);
  
      return decoded;
    } catch (exception) {
      return null;
    }
  };
  export const getRawToken = ():string|null => {
    const token = window.localStorage.getItem('token');
    console.log(token);
    return token;
  };
  const isTokenExpired = ():boolean => {
    const token = getToken();
  
    if(!token || !token.exp)
        return true;
    const expirationTime = token.exp;
    const currentTime = Math.floor(Date.now() / 1000);
  
    return expirationTime < currentTime;
  };
  
  export const isLoggedin = ():boolean => {
    const token = window.localStorage.getItem('token');
  
    if (!token) {
      return false;
    }
  
    const decoded = getToken();
  
    if (!decoded) {
      return false;
    }
  
    return true;
  };

 
  const tokenHelper ={
    removeToken,
    saveToken,
    isLoggedin,
    isTokenExpired,
    getToken,
    getRawToken
  };
  export default tokenHelper;