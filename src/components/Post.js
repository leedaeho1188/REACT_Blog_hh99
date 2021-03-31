import React from "react";
import styled from "styled-components"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import {history} from "../redux/configureStore"
import {useDispatch} from "react-redux"
import { actionCreators as postActions } from "../redux/modules/post";

const Post = (props) => {
  const dispatch = useDispatch()
  const {user_profile, _onClick ,like_cnt, comment_cnt, is_me} = props

  if(props.layout === 'a'){
    return(
      <React.Fragment>
        <PostContainer>
          <PostTop>
            <div style={{display: "flex"}}>
              <ProfileImg src={user_profile}/>
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
            <FormControlLabel
            control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
            style={{marginLeft: "8px"}}/>
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
              <ProfileImg src={user_profile}/>
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
            <FormControlLabel
            control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
            style={{marginLeft: "8px"}}/>
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
              <ProfileImg src={user_profile}/>
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
            <FormControlLabel
            control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
            style={{marginLeft: "8px"}}/>
            <div style={{marginRight: "14px"}}>Liked: {like_cnt}</div>
          </PostBottom>
        </PostContainer>
      </React.Fragment>
    )
  }
}

Post.defaultProps = {
  user_name: "Bradlee",
  user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  contents: "리액트 기본주차 때 만든 Calendar 프로젝트입니다.",
  project_url: "https://react-calendar-bradlee.web.app/",
  comment_cnt: 10,
  insert_dt: "2021-02-27 10:00:00",
  is_me: false,
  like_cnt: 5,
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