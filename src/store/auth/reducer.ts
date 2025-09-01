import {
  AuthState,
  AuthAction,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  BLOCK_ACCOUNT_REQUEST,
  BLOCK_ACCOUNT_SUCCESS,
  BLOCK_ACCOUNT_FAILURE,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
  SET_ROLE,
} from "./types";

const initialState: AuthState = {
  user: null,
  role: null,
  error: null,
};

export function authReducer(
  state = initialState,
  action: AuthAction,
): AuthState {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case BLOCK_ACCOUNT_REQUEST:
    case DELETE_ACCOUNT_REQUEST:
      return { ...state, error: null };
    case REGISTER_SUCCESS:
    case BLOCK_ACCOUNT_SUCCESS:
      return { ...state };
    case LOGIN_SUCCESS:
      return { ...state, user: action.user, error: null };
    case DELETE_ACCOUNT_SUCCESS:
      return { ...state, user: null, role: null, error: null };
    case SET_ROLE:
      return { ...state, role: action.role };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case BLOCK_ACCOUNT_FAILURE:
    case DELETE_ACCOUNT_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
}
