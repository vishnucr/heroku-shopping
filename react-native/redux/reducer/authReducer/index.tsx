//import api from "api";
import { Reducer } from "../types";
import {
  AuthTypes,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "./types";

//ACTION
function loginRequest() {
  return {
    type: LOGIN_REQUEST
  };
}
function loginError(error: object) {
  return {
    type: LOGIN_REQUEST,
    payload: error
  };
}
function loginSuccess(data: object) {
  return {
    type: LOGIN_REQUEST,
    payload: data
  };
}
function shouldLogin(state: Reducer) {
  const { loading } = state.authReducer;
  return loading;
}

export function getAllEmployeesTeam() {
  return async (dispatch: Function, getState: Function) => {
    if (!shouldLogin(getState())) {
      dispatch(loginRequest());
      // try {
      //   dispatch(getAllEmployeeLoadTeam(dispatch));
      //   const json = await api.getAllEmployees(page, size, sort, locationId);
      //   return dispatch(onGetEmployeeTeam(json, null));
      // } catch (error) {
      //   dispatch(getEmployeeLoadErrorTeam(error));
      // }
    }
  };
}

//REDUCER
export default function userReducer(
  state = {
    isFetching: false,
    token: null,
    userData: null
  },
  action: AuthTypes
) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.payload
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.payload
      });
    default:
      return state;
  }
}
