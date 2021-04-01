import React from "react";
import Post from "../components/Post";
import CommentWrite from "../components/CommentWrite"
import Permit from "../shared/Permit";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import {history} from "../redux/configureStore"

const PostDetail = (props) => {
  const dispatch = useDispatch()
  const id = props.match.params.id;
  const user_info = useSelector((state) => state.user.user);
  const post_list = useSelector((state) => state.post.list);
  const post_idx = post_list.findIndex((p) => p.id === id);
  const post = post_list[post_idx];

  React.useEffect(() => {
    if (post) {
      return;
    }
    dispatch(postActions.getOnePostFB(id));
  }, []);

  return(
    <React.Fragment>
      {post && (
        <Post {...post} 
        _onClick={() => {
          history.push(`/`);
        }}
        is_me={post.user_info.user_id === user_info?.uid}
        is_detail
        />
      )}
      
    </React.Fragment>
  )
}

export default PostDetail