import React from "react";
import styled from "styled-components"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import {history} from "../redux/configureStore"
import { useDispatch, useSelector } from "react-redux"
import { actionCreators as postActions } from "../redux/modules/post";

const Post = (props) => {
  const dispatch = useDispatch();
  const {user_profile, _onClick ,like_cnt, is_me} = props;
  const user_info = useSelector((state) => state.user.user);
  const is_login = useSelector((state) => state.user.is_login)
  const idx = props.like_id.findIndex((l) => l === user_info.uid);
  const is_like = idx !== -1 ? true : false

  const likeSubmit = () => {
    if(!is_login){
      window.alert("😀로그인 해야 할 수 있어요!")
      return
    }
    let like_id;
    if(props.like_id.length === 0){
      like_id = [user_info.uid];
    } else {
      like_id = [...props.like_id, user_info.uid]; 
    }
    let cnt = props.like_cnt + 1;
    
    let post = {
      like_cnt : cnt,
      like_id : like_id
    }
    let post_id = props.id;
    dispatch(postActions.editLikeFB(post, post_id))
  }

  const dislikeSubmit = () => {
    let like_id = props.like_id.filter((l, idx) => {
      if(l !== user_info.uid){
        return [...like_id, l]
      }
    })
    let cnt = props.like_cnt - 1;
    let post = {
      like_cnt : cnt,
      like_id : like_id
    }
    let post_id = props.id;
    dispatch(postActions.editLikeFB(post, post_id))
  }

  if(props.layout === 'a'){
    return(
      <React.Fragment>
        <PostContainer>
          <PostTop>
            <div style={{display: "flex"}}>
              <UserName>{props.user_info.user_name}</UserName>
            </div>
            <div style={{display: "flex"}}>
            <p>{props.insert_dt}</p>
              {is_me && (
              <PostBtn>
                <Button color="secondary" style={{fontSize: '15px'}}
                  onClick={() => {
                    dispatch(postActions.removePostFB(props.id))
                  }}>
                  삭제
                </Button>
                <Button color="primary" style={{fontSize: '15px'}} 
                  onClick={() => {
                    history.push(`/write/${props.id}`)
                  }}
                >
                  수정
                </Button>
                </PostBtn>
                )}
            </div>
          </PostTop>
          <PostImg src={props.image_url} onClick={_onClick} />
          <PostBottom>
            {is_like ? 
            (<PostLike style={{color: 'red'}} onClick={dislikeSubmit} >❤</PostLike>) : (
            <PostLike style={{color: 'pink'}} onClick={likeSubmit}  >❤</PostLike>)}
            <div style={{marginRight: "14px"}}>Liked: {like_cnt}</div>
          </PostBottom>
          <PostLink href={props.url} target="_blank">{props.name}</PostLink>
          <Contents>{props.contents}</Contents>
        </PostContainer>
      </React.Fragment>
    )
  }
  if(props.layout === 'b'){
    return(
      <React.Fragment>
        <PostContainer>
          <PostTop>
            <div style={{display: "flex"}}>
              <UserName>{props.user_info.user_name}</UserName>
            </div>
            <div style={{display: "flex"}}>
            <p>{props.insert_dt}</p>
              {is_me && (
              <PostBtn>
                <Button color="secondary" style={{fontSize: '15px'}}
                  onClick={() => {
                    dispatch(postActions.removePostFB(props.id))
                  }}>
                  삭제
                </Button>
                <Button color="primary" style={{fontSize: '15px'}} 
                  onClick={() => {
                    history.push(`/write/${props.id}`)
                  }}
                >
                  수정
                </Button>
                </PostBtn>
                )}
            </div>
          </PostTop>
          <PostLink href={props.url} target="_blank">{props.name}</PostLink>
          <Contents>{props.contents}</Contents>
          <PostImg src={props.image_url} onClick={_onClick} />
          <PostBottom>
          {is_like ? 
            (<PostLike style={{color: 'red'}} onClick={dislikeSubmit} >❤</PostLike>) : (
            <PostLike style={{color: 'pink'}} onClick={likeSubmit}  >❤</PostLike>)}
            <div style={{marginRight: "14px"}}>Liked: {like_cnt}</div>
          </PostBottom>
        </PostContainer>
      </React.Fragment>
    )
  }
  if(props.layout === 'c'){
    return(
      <React.Fragment>
        <PostContainer>
          <PostTop>
            <div style={{display: "flex"}}>
              <UserName>{props.user_info.user_name}</UserName>
            </div>
            <div style={{display: "flex"}}>
            <p>{props.insert_dt}</p>
              {is_me && (
              <PostBtn>
                <Button color="secondary" style={{fontSize: '15px'}}
                  onClick={() => {
                    dispatch(postActions.removePostFB(props.id))
                  }}>
                  삭제
                </Button>
                <Button color="primary" style={{fontSize: '15px'}} 
                  onClick={() => {
                    history.push(`/write/${props.id}`)
                  }}
                >
                  수정
                </Button>
                </PostBtn>
                )}
            </div>
          </PostTop>
          <div style={{display:"flex"}}>
            <PostImgC src={props.image_url} onClick={_onClick} />
          <div style={{width:"30%"}}>
            <PostLink href={props.url} target="_blank">{props.name}</PostLink>
            <Contents>{props.contents}</Contents>
          </div>
          </div>
          <PostBottom>
          {is_like ? 
            (<PostLike style={{color: 'red'}} onClick={dislikeSubmit} >❤</PostLike>) : (
            <PostLike style={{color: 'pink'}} onClick={likeSubmit}  >❤</PostLike>)}
            <div style={{marginRight: "14px"}}>Liked: {like_cnt}</div>
          </PostBottom>
        </PostContainer>
      </React.Fragment>
    )
  }
}

Post.defaultProps = {
  is_me: false,
  is_like: false,
  _onClick: () => {},
};


const PostContainer = styled.div`
  display: flex;
  width: 60vw;
  max-width: 750px;
  justify-content: space-between;
  flex-direction: column;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 30px;
  border-radius: 14px;
  padding-bottom : 20px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.12), 0 2px 5px rgba(0,0,0,0.24);
`

const UserName = styled.p`
  margin:0;
  font-size: 15px;
  margin-left: 8px;
  align-self: center;
`
const Contents = styled.p`
  margin-left: 14px;
`
const PostTop = styled.div`
  display: flex;
  text-align: center;
  padding: 20px 14px; 
  justify-content: space-between;
  align-items: center;
`
const PostBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const PostImg = styled.img`
  width: 100%;
  height: 500px;
  margin-bottom: 10px;
  cursor: pointer;
`

const PostImgC = styled.img`
  width: 70%;
  height: 500px;
  margin-bottom: 10px;
  cursor: pointer;
`

const PostLink = styled.a`
  text-decoration: none;
  color: #037bfc;
  margin-left: 14px;
  margin-top: 5px;
  &:hover {
    color: #4503fc;
    font-weight: 600;
  }
`
const PostLike = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  font-size: 20px;
  margin-left: 8px;
  border-radius: 20px;
  &:hover {
    background-color: #F9E9F4;
  }
`

const ProfileImg = styled.img`
  width: 32px;
  border-radius: 16px;
  height: 32px;
  background-size: cover;
`

const PostBtn = styled.div`
  display: flex;
  justify-content: center;
  width:50%;
  margin: auto;
`

export default Post;