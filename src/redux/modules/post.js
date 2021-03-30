import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import "moment";
import moment from "moment";
import { history } from "../configureStore"
import { actionCreators as imageActions } from "./image";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING";

const setPost = createAction(SET_POST, (post_list, paging) => ({ post_list, paging }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
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



export default handleActions(
  {
    [ADD_POST]: (state, action) => produce(state, (draft) => {
      draft.list.unshift(action.payload.post)
    })
  },
  initialState
)

const actionCreators = {
  setPost,
  addPost,
  editPost,
  addPostFB
}

export {actionCreators}