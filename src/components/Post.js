import React from "react";
import styled from "styled-components"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';

const Post = (props) => {
  const {user_name, user_profile, image_url, like_cnt, contents, comment_cnt, insert_dt, is_me, project_url} = props

  return(
    <React.Fragment>
      <PostContainer>
        <PostTop>
          <div style={{display: "flex"}}>
            <ProfileImg src={user_profile}/>
            <UserName>{user_name}</UserName>
          </div>
          <p>{insert_dt}</p>
        </PostTop>
        <PostImg src={image_url}/>
        <PostBottom>
          <FormControlLabel
          control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
          style={{marginLeft: "8px"}}/>
          <div style={{marginRight: "14px"}}>Liked: {like_cnt}</div>
        </PostBottom>
        <PostLink href={project_url} target="_blank">REACT_Calendar</PostLink>
        <Contents>{contents}</Contents>
      </PostContainer>
    </React.Fragment>
  )
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

export default Post;