import React from "react";

import Upload from "../shared/Upload"

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from "styled-components"

import { actionCreators as postActions } from "../redux/modules/post";
import { useSelector, useDispatch } from "react-redux";

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  const [contents, setContents] = React.useState("")
  const [url, setUrl] = React.useState("")
  const [name, setName] = React.useState("")

  const changeContents = (e) => {
    setContents(e.target.value)
  }

  const changeUrl = (e) => {
    setUrl(e.target.value)
  }

  const changeName = (e) => {
    setName(e.target.value)
  }

  const addPost = () => {
    let post ={
      url: url,
      contents: contents,
      name: name,
    }

    dispatch(postActions.addPostFB(post));
  }

  return(
    <>
     <WriteContainer>
      <h1 style={{textAlign: "center"}}>게시글 작성</h1>
      <div style={{marginLeft:"15px"}}>
        <Upload/>
      </div>
      <WriteImg src={preview ? preview : "http://via.placeholder.com/400x300"} />
      <TextContainer>
        <TextField
              id="standard-search"
              label="프로젝트 이름"
              type="text"
              style={{marginTop: "14px"}}
              onChange = {changeName}
            />
        <TextField
              id="standard-search"
              label="프로젝트 URL"
              type="text"
              style={{marginTop: "14px"}}
              onChange = {changeUrl}
            />
        <TextField
            id="outlined-multiline-static"
            label="프로젝트 설명"
            style={{margin: "24px 0"}}
            onChange = {changeContents}
            multiline
            rows={4}
            defaultValue=""
            variant="outlined"/>
        <Button variant="contained" color="primary" onClick={addPost}>
          글 작성
        </Button>
      </TextContainer>
     </WriteContainer>
    </>
  )
}

const WriteContainer = styled.div`
  display: flex;
  width: 60vw;
  max-width: 750px;
  justify-content: space-between;
  flex-direction: column;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 30px;
  border-radius: 14px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.12), 0 2px 5px rgba(0,0,0,0.24);
`

const WriteImg = styled.img`
  width: 100%;
  height: 70vh;
  margin: 15px 0;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: auto;
  padding-bottom: 20px;
  justify-content: space-between;
`
export default PostWrite;