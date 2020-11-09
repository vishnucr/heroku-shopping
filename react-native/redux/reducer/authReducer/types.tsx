export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export interface AuthType {
  token: string;
  data: object;
  loading: boolean;
}

interface LoginRequest {
  type: typeof LOGIN_REQUEST;
}

interface LoginFailure {
  type: typeof LOGIN_FAILURE;
  payload:object
}

interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload:object
}

export type AuthTypes = LoginRequest | LoginFailure | LoginSuccess;
