import React, {useEffect} from "react";

import Upload from "../shared/Upload"

import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from "styled-components"
import { actionCreators as imageActions } from "../redux/modules/image"
import { actionCreators as postActions } from "../redux/modules/post";
import { useSelector, useDispatch } from "react-redux";

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);
  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;
  let _post = is_edit? post_list.find((p) => p.id === post_id) : null;
  const [contents, setContents] = React.useState(_post ? _post.contents : "")
  const [url, setUrl] = React.useState(_post? _post.url : "")
  const [name, setName] = React.useState( _post? _post.name : "")
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  }
  console.log(selectedValue)

  useEffect(() => {
    dispatch(imageActions.removePreview())
  }, [])

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
    if(!url || !contents || !name){
      window.alert("😗빈칸을 채워주세요...ㅎㅎ")
      return
    }

    let post ={
      url: url,
      contents: contents,
      name: name,
      layout: selectedValue,
    }
    console.log(post)
    dispatch(postActions.addPostFB(post));
  }

  const editPost = () => {
    if(!url || !contents || !name){
      window.alert("😗빈칸을 채워주세요...ㅎㅎ")
      return
    }

    let post={
      url: url,
      contents: contents,
      name: name,
      layout: selectedValue,
    }
    dispatch(postActions.editPostFB(post_id, post))
  }
  if (selectedValue==='a'){

  return(
     <WriteContainer>
      <h2 style={{textAlign: "center"}}>게시글 작성</h2>
      <div style={{marginLeft:"15px"}}>
        <Upload/>
      </div>
      <WriteImg src={preview ? preview : "http://via.placeholder.com/400x300"} />
      <TextContainer>
        <TextField
              id="standard-search"
              label="프로젝트 이름"
              type="text"
              value={name}
              style={{marginTop: "14px"}}
              onChange = {changeName}
            />
        <TextField
              id="standard-search"
              label="프로젝트 URL"
              value={url}
              type="text"
              style={{marginTop: "14px"}}
              onChange = {changeUrl}
            />
        <TextField
            id="outlined-multiline-static"
            label="프로젝트 설명"
            style={{margin: "24px 0"}}
            onChange = {changeContents}
            value={contents}
            multiline
            rows={4}
            defaultValue=""
            variant="outlined"/>
      </TextContainer>

      <BottomContainer>
      <div style={{textAlign: "center"}} >
        <Radio
          checked={selectedValue === 'a'}
          onChange={handleChange}
          value="a"
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'A' }}
        />
        <Radio
          checked={selectedValue === 'b'}
          onChange={handleChange}
          value="b"
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'B' }}
        />
        <Radio
          checked={selectedValue === 'c'}
          onChange={handleChange}
          value="c"
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'C' }}
        />
      </div>
            {is_edit ? (
              <Button variant="contained" color="primary" onClick={editPost}>
                글 수정
              </Button>
            ):(
              <Button variant="contained" color="primary" onClick={addPost}>
                글 작성
              </Button>
            )
            }
      </BottomContainer>
     </WriteContainer>
     )
  }
  if (selectedValue === 'b'){
    return(
      <WriteContainer>
       <h2 style={{textAlign: "center"}}>게시글 작성</h2>
       <TextContainer>
         <TextField
               id="standard-search"
               label="프로젝트 이름"
               type="text"
               value={name}
               style={{marginTop: "14px"}}
               onChange = {changeName}
             />
         <TextField
               id="standard-search"
               label="프로젝트 URL"
               value={url}
               type="text"
               style={{marginTop: "14px"}}
               onChange = {changeUrl}
             />
         <TextField
             id="outlined-multiline-static"
             label="프로젝트 설명"
             style={{margin: "24px 0"}}
             onChange = {changeContents}
             value={contents}
             multiline
             rows={4}
             defaultValue=""
             variant="outlined"/>
       </TextContainer>
       <div style={{marginLeft:"15px"}}>
         <Upload/>
       </div>
       <WriteImg src={preview ? preview : "http://via.placeholder.com/400x300"} />
 
       <BottomContainer>
       <div style={{textAlign: "center"}} >
         <Radio
           checked={selectedValue === 'a'}
           onChange={handleChange}
           value="a"
           name="radio-button-demo"
           inputProps={{ 'aria-label': 'A' }}
         />
         <Radio
           checked={selectedValue === 'b'}
           onChange={handleChange}
           value="b"
           name="radio-button-demo"
           inputProps={{ 'aria-label': 'B' }}
         />
         <Radio
           checked={selectedValue === 'c'}
           onChange={handleChange}
           value="c"
           name="radio-button-demo"
           inputProps={{ 'aria-label': 'C' }}
         />
       </div>
             {is_edit ? (
               <Button variant="contained" color="primary" onClick={editPost}>
                 글 수정
               </Button>
             ):(
               <Button variant="contained" color="primary" onClick={addPost}>
                 글 작성
               </Button>
             )
             }
       </BottomContainer>
      </WriteContainer>
      )
  }
  if (selectedValue === 'c'){
    return(
      <WriteContainer>
       <h2 style={{textAlign: "center"}}>게시글 작성</h2>
       <div style={{marginLeft:"15px"}}>
         <Upload/>
       </div>
       <MiddleContainer>
       <WriteImgC src={preview ? preview : "http://via.placeholder.com/400x300"} style={{width: "50%"}} />
       <TextContainer>
         <TextField
               id="standard-search"
               label="프로젝트 이름"
               type="text"
               value={name}
               style={{marginTop: "14px"}}
               onChange = {changeName}
             />
         <TextField
               id="standard-search"
               label="프로젝트 URL"
               value={url}
               type="text"
               style={{marginTop: "14px"}}
               onChange = {changeUrl}
             />
         <TextField
             id="outlined-multiline-static"
             label="프로젝트 설명"
             style={{margin: "24px 0"}}
             onChange = {changeContents}
             value={contents}
             multiline
             rows={4}
             defaultValue=""
             variant="outlined"/>
       </TextContainer>
       </MiddleContainer>
 
       <BottomContainer>
       <div style={{textAlign: "center"}} >
         <Radio
           checked={selectedValue === 'a'}
           onChange={handleChange}
           value="a"
           name="radio-button-demo"
           inputProps={{ 'aria-label': 'A' }}
         />
         <Radio
           checked={selectedValue === 'b'}
           onChange={handleChange}
           value="b"
           name="radio-button-demo"
           inputProps={{ 'aria-label': 'B' }}
         />
         <Radio
           checked={selectedValue === 'c'}
           onChange={handleChange}
           value="c"
           name="radio-button-demo"
           inputProps={{ 'aria-label': 'C' }}
         />
       </div>
             {is_edit ? (
               <Button variant="contained" color="primary" onClick={editPost}>
                 글 수정
               </Button>
             ):(
               <Button variant="contained" color="primary" onClick={addPost}>
                 글 작성
               </Button>
             )
             }
       </BottomContainer>
      </WriteContainer>
      )
  }
}

const WriteContainer = styled.div`
  display: flex;
  width: 60vw;
  max-width: 750px;
  background-color: white;
  justify-content: space-between;
  flex-direction: column;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 30px;
  border-radius: 14px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.12), 0 2px 5px rgba(0,0,0,0.24);
  @media (max-width: 750px){
    width: 80vw;
  }
  @media (max-width: 450px){
    width: 100vw;
  }
`

const WriteImg = styled.img`
  width: 100%;
  height: 70vh;
  margin: 15px 0;
  @media (max-width: 450px){
    height: 50vh;
  }
`
const WriteImgC = styled.img`
  width: 100%;
  height: 50vh;
  margin: 15px 0;
  @media (max-width: 750px){
    height: 40vh;
  }
  @media (max-width: 450px){
    height: 30vh;
  }
`


const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: auto;
  justify-content: space-between;
  padding: 0px 15px;
`

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: auto;
  padding-bottom: 20px;
  justify-content: center;
`

const MiddleContainer = styled.div`
  display: flex;
`
export default PostWrite;