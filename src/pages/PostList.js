import React from "react"

import Post from "../components/Post"

import {useSelector, useDispatch} from "react-redux";
import {actionCreators as postActions} from "../redux/modules/post";
import {history} from "../redux/configureStore"

const PostList = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  // const is_loading = useSelector((state) => state.post.is_loading);
  // const paging = useSelector((state) => state.post.paging)

  React.useEffect(() => {
    if(post_list.length < 2){
    }
  })

  return (
    <React.Fragment>
      {post_list.map((p, idx) => {
        return(
          <Post {...p} />
        )
      })}
    </React.Fragment>
  )
}

export default PostList;