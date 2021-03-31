import React from "react"

import Post from "../components/Post"
import InfinityScroll from "../shared/InfinityScroll";

import {useSelector, useDispatch} from "react-redux";
import {actionCreators as postActions} from "../redux/modules/post";
import {history} from "../redux/configureStore"

const PostList = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging)


  React.useEffect(() => {
    if(post_list.length < 2){
      dispatch(postActions.getPostFB())
    }
  }, [])
  console.log(paging);
  return (
    <React.Fragment>
      <InfinityScroll 
        next = {paging.next}
        callNext={() => {
          console.log(paging);
          // a++
          // console.log(a)
          dispatch(postActions.getPostFB(paging.next));
        }}
        is_next={paging.next ? true : false}
        loading={is_loading}
      >
        {post_list.map((p, idx) => {
          if(post_list.length > 0){
            return(
              <Post {...p} 
                key={p.id}
                _onClick={() => {
                history.push(`/post/${p.id}`);
              }} />
            )}
          })}
        
      </InfinityScroll>
    </React.Fragment>
  )
}

export default PostList;