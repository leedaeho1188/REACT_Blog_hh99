import { createAction, handleActions } from "redux-actions"
import { produce } from "immer";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie"
import { auth } from "../../shared/firebase";
import { history } from "../configureStore";
import firebase from "firebase/app";

const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

const logOut = createAction(LOG_OUT, (user)=>({user}))
const getUser = createAction(GET_USER, (user)=>({user}))
const setUser = createAction(SET_USER, (user)=> ({user}))

const initialState = {
  user: {
    user_name: null,
    uid: null,
  },
  is_login: false,
};

const loginFB = (id, pwd) => {
  return function (dispatch, getState){
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
      auth
        .signInWithEmailAndPassword(id, pwd)
        .then((user) => {
          console.log(user);
          dispatch(
            setUser({
              user_name: user.user.displayName,
              id: id,
              uid: user.user.uid,
            })
          )
        }).catch((error) => {
          console.log(error.message)
        })
      });
    };
  };


const signupFB = (id, pwd, user_name) => {
  return function (dispatch, getState, { history }) {
    auth.createUserWithEmailAndPassword(id, pwd)
      .then((user) => {
        console.log(user);
        auth.currentUser.updateProfile({
          displayName: user_name,
        }).then(() => {
          dispatch(
            setUser({
              user_name: user_name,
              id: id,
              uid: user.user.uid,
            })
          )
        }).catch((error) => {
          console.log(error)
        })

      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, errorMessage)
      })
  }
}

const loginCheckFB = () => {
  return function (dispatch){
    auth.onAuthStateChanged((user) => {
      if(user){
        dispatch(setUser({
          user_name: user.displayName,
          id: user.email,
          uid: user.uid,
        }))
      }else{
        dispatch(logOut())
      }
    })
  }
}

const logoutFB = () => {
  return function (dispatch){
    auth.signOut().then(() => {
      dispatch(logOut());
      history.replace("/");
    })
  }
}


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
  signupFB,
  loginFB,
  loginCheckFB,
  logoutFB,
}

export { actionCreators }