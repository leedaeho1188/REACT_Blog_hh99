import React from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

const SignupModal = ({status, close}) => {
  return(
    <>
    {status ? (
      <div>
        <Component onClick={close}/>
        <ModalContainer>
          <h1>Sign Up</h1>
          <TextField
            id="standard-password-input"
            label="Email Address"
            type="text"
          />
          <TextField
            id="standard-password-input"
            label="이름"
            type="text"
          />
          <TextField
            id="standard-password-input"
            label="Password"
            type="text"
            autoComplete="current-password"
          />
          <TextField
            id="standard-password-input"
            label="Confirm password"
            type="password"
            autoComplete="current-password"
          />
          <Button variant="contained" color="secondary">
            회원가입
          </Button>
          <ExitBtn onClick={close}>
            <CloseIcon/>
          </ExitBtn>
        </ModalContainer>
      </div>
    ) : null}
    </>
  )
}

const Component = styled.div`
  position: fixed;
  top: 0;
  opacity: 0.4;
  height: 100vh;
  width: 100vw;
  background-color: silver;
  z-index: 10;
`

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  max-width: 500px; 
  width: 50vw;
  height: 60vh;
  border-radius: 10px;
  padding: 30px;
  z-index: 20;
  opacity: 1;
  box-shadow: 0 3px 6px rgba(0,0,0,0.12), 0 2px 5px rgba(0,0,0,0.24);
  @media (max-width:700px){
    width: 70vw;
  }
  @media (max-width:450px){
    width: 100vw;
  }
`
const ExitBtn = styled.button`
  position: fixed;
  right: 5px;
  top: 5px;
  background-color: white;
  outline: none;
  border: none;
  cursor: pointer;
  @media (max-width:450px){
    right: 30px;
  };
`
export default SignupModal