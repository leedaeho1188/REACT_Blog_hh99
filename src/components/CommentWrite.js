import React from "react"

import TextField from '@material-ui/core/TextField';
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { actionCreators as commentActions } from "../redux/modules/comment";

const CommentWrite = (props) => {
  const dispatch = useDispatch()
  const [comment_text, setCommentText] = React.useState();
  const {post_id} = props;

  const onChange = (e) => {
    console.log(e.target.value)
    setCommentText(e.target.value);
  }

  const write = () => {
    console.log(comment_text, post_id)
    dispatch(commentActions.addCommentFB(post_id, comment_text))
    setCommentText("");
  }

  return(
    <React.Fragment>
      <CmtWrtContainer>
        <TextField 
          id="standard-search" 
          label="댓글을 입력해주세요." 
          type="text"
          style={{width:'80%'}}
          onChange={onChange}
          // value={comment_text} 
        />
        <CmtSubmitBtn
          onClick={write}
        >작성</CmtSubmitBtn>
      </CmtWrtContainer>
    </React.Fragment>
  )
}

const CmtWrtContainer = styled.div`
  display: flex;
  width: 60%;
  margin: auto;
  justify-content: center;
`

const CmtSubmitBtn = styled.button`
  background-color: grey;
  color: white;
  cursor: pointer;
  outline: none;
  // border-radius: 20px;
  padding: 0px 10px;
  border: none;
`

export default CommentWrite