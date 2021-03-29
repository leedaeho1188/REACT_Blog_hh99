import React, {useState} from "react"

import LoginModal from "./LoginModal"
import SignupModal from "./SignupModal"

import {Grid, Text, Button} from "../elements"
import styled from "styled-components";


const Header = (props) => {
  const [l_status, isLoginOpen] = useState(false)
  const [S_status, isSignupOpen] = useState(false)

  const OpenLogin = () => {
    isLoginOpen(true)
  }
  const CloseLogin = () => {
    isLoginOpen(false)
  }
  const OpenSignup = () => {
    isSignupOpen(true)
  }
  const CloseSignup = () => {
    isSignupOpen(false)
  }


  return(
    <React.Fragment>
      <FlexContainer>
        <HeaderBtn>⛵ h-log</HeaderBtn>
      <div>
        <HeaderBtn onClick={() => {
          OpenLogin()
        }}>Login</HeaderBtn>
        <HeaderBtn onClick={() => {
          OpenSignup()
        }}>Sign Up</HeaderBtn>
      </div>
      </FlexContainer>
      <LoginModal status={l_status} close={CloseLogin}/>
      <SignupModal status={S_status} close={CloseSignup}/>
    </React.Fragment>
  )
}

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
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
  margin-right: 10px;
  &:hover {
    font-weight:600;
  };
`




export default Header