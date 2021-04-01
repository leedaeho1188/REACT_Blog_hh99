import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore} from "../../shared/firebase";

import { actionCreators as postActions } from "./post";
import moment from "moment";

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const LOADING = "LOADING";

const addComment = createAction(ADD_COMMENT, (post_id, comment, id) => ({
  post_id,
  comment,
  id,
}))

const loading = createAction(LOADING, (is_loading) => ({ is_loading }))

const initialState = {
  list: {},
  is_loading: false
}

const addCommentFB = (post_id, contents) => {
  return function (dispatch, getState) {
    const commentDB = firestore.collection("comment");
    const user_info = getState().user.user;

    let comment = {
      post_id: post_id,
      user_id: user_info.uid,
      user_name: user_info.user_name,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };

    commentDB.add(comment).then((doc) => {

      comment = {...comment};

      dispatch(addComment(post_id, comment, doc.id))
    })
  }
}

const getCommentFB = (post_id = null) => {

}

export default handleActions(
  {
    [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
      state.list[action.payload.post_id] = [...state.list[action.payload.post_id], {...action.payload.comment}]
    }),
  },
  initialState
);

const actionCreators = {
  addCommentFB,
  addComment,
};

export { actionCreators }