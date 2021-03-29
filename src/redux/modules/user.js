import { createAction, handleActions } from "redux-actions"
import { produce } from "immer";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie"



const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

const logOut = createAction(LOG_OUT, (user)=>({user}))
const getUser = createAction(GET_USER, (user)=>({user}))
const setUser = createAction(SET_USER, (user)=> ({user}))

const initialState = {
  user: null,
  is_login: false,
};

export default handleActions(
  {
    [SET_USER]: (state, action) => produce(state, (draft) => {
      setCookie("is_login", "success");
      draft.user = action.payload.user;
      draft.is_login = true;
    }),
    [LOG_OUT]: (state, action) => produce(state, (draft) => {
      deleteCookie("is_login");
      draft.user = null;
      draft.is_login = false;
    })
  },
  initialState
)

const actionCreators = {
  logOut,
  getUser,
}

export { actionCreators }