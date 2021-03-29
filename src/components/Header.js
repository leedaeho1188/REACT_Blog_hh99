import React from "react"
import {Grid, Text, Button} from "../elements"
import styled from "styled-components";


const Header = (props) => {
  // return(
  //   <React.Fragment>
  //     <Grid padding="8px 16px" margin="auto" display="flex">
  //       <Grid>
  //         <Button 
  //           text="hh99_Log "
  //           size='20px' 
  //           _onClick={()=>{
  //             // props.history.push("/")
  //           }}></Button>
  //       </Grid>
  //       <Grid justify="right" diplay="flex">
  //         <Button
  //           text="로그인"
  //           _onClick={() => {
  //             // props.history.push("/login")
  //           }}
  //         ></Button>
  //         <Button
  //           text="회원가입"
  //           _onCLick={() => {

  //           }}
  //         ></Button>  
  //       </Grid>
  //     </Grid>
  //   </React.Fragment>
  // )

  return(
    <React.Fragment>
      <FlexContainer>
        <HeaderBtn>h-log</HeaderBtn>
      <div>
        <HeaderBtn style={{marginRight : "10px"}}>로그인</HeaderBtn>
        <HeaderBtn>회원가입</HeaderBtn>
      </div>
      </FlexContainer>
    </React.Fragment>
  )
}

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 14px;
  width: 100vw;
  margin: auto;
  box-sizing: border-box;
`



const HeaderBtn = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 20px;

`




export default Header