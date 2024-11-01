import { jwtDecode, JwtPayload } from "jwt-decode";
import { TokenPayload, User } from "../types/AuthTypes";

const saveToken = (token: string): void => {
  if (!token) {
    return;
  }
  window.localStorage.setItem("token", token);
};

const removeToken = (): void => {
  window.localStorage.removeItem("token");
};

const getToken = (): TokenPayload | null => {
  const token = window.localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode<TokenPayload>(token);

    return decoded;
  } catch (exception) {
    return null;
  }
};
const getRawToken = (): string | null => {
  const token = window.localStorage.getItem("token");
  return token;
};
const isTokenExpired = (): boolean => {
  const token = getToken();

  if (!token || !token.exp) return true;
  const expirationTime = token.exp;
  const currentTime = Math.floor(Date.now() / 1000);

  return expirationTime < currentTime;
};

const isLoggedin = (): boolean => {
  const token = window.localStorage.getItem("token");

  if (!token) {
    return false;
  }

  const decoded = getToken();

  if (!decoded) {
    return false;
  }

  return true;
};
const getTokenRole = (): string | null => {
  const decoded = getToken();
  if (decoded && decoded.role) return decoded.role;
  return null;
};
const getTokenIdentity = (): string | null => {
  const decoded = getToken();
  if (decoded && decoded.identity) return decoded.identity;
  return null;
};
const getUser = (): User | null => {
  const role = getTokenRole();
  const identity = getTokenIdentity();
  const token = getRawToken();
  if (role && identity) {
    const user: User = {
      role: role,
      identity: identity,
      token:token
    };
    return user;
  }
  return null;
};

const tokenHelper = {
  removeToken,
  saveToken,
  isLoggedin,
  isTokenExpired,
  getToken,
  getRawToken,
  getTokenRole,
  getTokenIdentity,
  getUser,
};
export default tokenHelper;
