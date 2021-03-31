import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import "moment";
import moment from "moment";
import { history } from "../configureStore"
import { actionCreators as imageActions } from "./image";


const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const REMOVE_POST = "REMOVE_POST";
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING";

const setPost = createAction(SET_POST, (post_list, paging) => ({ post_list, paging }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const removePost = createAction(REMOVE_POST, (id) => ({ id }))
const editPost = createAction(EDIT_POST, (post_id, post) => ({ post_id, post }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }))

const initialState = {
  list: [],
  paging: { start: null,  next: null, size: 3},
  is_loading: false,
}

const initialPost = {
  image_url: "",
  contents: "",
  url: "",
  name: "",
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
}

const addPostFB = (post) => {
  return function (dispatch, getState) {
    const postDB = firestore.collection("post");
    const _user = getState().user.user

    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
    }

    const _post = {
      ...initialPost,
      contents: post.contents,
      url: post.url,
      name: post.name,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };
    const _image = getState().image.preview;

    console.log(_image);
    console.log(typeof _image);

    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");

    _upload.then((snapshot) => {
      snapshot.ref.getDownloadURL()
      .then((url) => {
        console.log(url);
        dispatch(imageActions.uploadImage(url));
        return url;
      }).then((url) => {
        console.log(url)
        postDB
        .add({ ...user_info, ..._post, image_url: url })
        .then((doc) => {
          let post_list = { user_info, ..._post, id: doc.id, image_url: url }
          dispatch(addPost(post_list))
          dispatch(imageActions.setPreview("http://via.placeholder.com/400x300"))
          history.replace("/")
        }).catch((err) => {
          window.alert("포스트 작성에 문제가 있어요!")
        })
      })
    }).catch((err) => {
      window.alert("이미지 업로드에 문제가 있어요!")
      console.log(err);
    })

  }
}

const getPostFB = (start = null, size = 3) => {
  return function (dispatch, getState) {
    let _paging = getState().post.paging;
    if(_paging.start && !_paging.next){
      return;
    }

    dispatch(loading(true))
    const postDB = firestore.collection("post");

    let query = postDB.orderBy("insert_dt", "desc")
    
    if(start){
      query = query.startAt(start);
    }

    query.limit(size + 1).get().then((docs) => {
      let post_list = [];

      let paging = {
        start: docs.docs[0],
        next: docs.docs.length === size+1? docs.docs[docs.docs.length -1] : null,
        size: size,
      }
      docs.forEach((doc) => {
        let _post = doc.data();
        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf("user_") !== -1){
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }
            return {...acc, [cur]: _post[cur]};
          },
          { id: doc.id, user_info: {} }
        );
        
        post_list.push(post);
      })
      if(post_list.length > size){
        post_list.pop();
      }

      console.log(post_list);

      dispatch(setPost(post_list, paging))
      
    })
  }
}

const getOnePostFB = (id) => {
  return function(dispatch) {
    const postDB = firestore.collection("post");
    postDB.doc(id).get().then((doc)=> {
      let _post = doc.data();
      if(!_post){
        return
      }
      let post = Object.keys(_post).reduce(
        (acc, cur) => {
          if (cur.indexOf("user_") !== -1){
            return {
              ...acc,
              user_info: {...acc.user_info, [cur]: _post[cur]},
            }
          }
          return { ...acc, [cur]: _post[cur] };
        },
        { id: doc.id, user_info: {}}
      )
      dispatch(setPost([post]))
    })
  }
}

const removePostFB = (id) => {
  return function(dispatch) {
    const postDB = firestore.collection("post");
    postDB.doc(id).delete().then(() => {
      dispatch(removePost(id))
      history.replace('/')
    } )
  }
}

export default handleActions(
  { 
    [ADD_POST]: (state, action) => produce(state, (draft) => {
      draft.list.unshift(action.payload.post)
    }),
    [SET_POST]: (state, action) => produce(state, (draft) => {
      draft.list.push(...action.payload.post_list);
      draft.list = draft.list.reduce((acc, cur) => {
        if(acc.findIndex(a => a.id === cur.id) === -1){
          return [...acc, cur];
        }else{
          acc[acc.findIndex((a) => a.id === cur.id)] = cur;
          return acc;
        }
      }, []);
      if(action.payload.paging){
        draft.paging = action.payload.paging;
      }
      draft.is_loading = false;
    }),
    [REMOVE_POST]: (state, action) => produce(state, (draft) => {
      draft.list = state.list;
      draft.list = draft.list.filter((r, idx) => {
        if(r.id !== action.payload.id){
          console.log(r.id)
          return [...draft.list, r]
        }
      })
    }),
    [LOADING]: (state, action) => produce(state, (draft) => {
      draft.is_loading = action.payload.is_loading;
    })
  },
  initialState
)

const actionCreators = {
  setPost,
  addPost,
  editPost,
  addPostFB,
  getPostFB,
  getOnePostFB,
  removePostFB,
  removePost,
}

export {actionCreators}