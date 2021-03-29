import React from "react"
import styled from "styled-components"

const Button = (props) => {
  const {text, _onClick, is_float, children, margin, width, padding, size} = props
  
  const styles = {
    margin: margin,
    width: width,
    padding: padding,
    size:  size,
  }

  return(
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick}>{text? text : children}</ElButton>
    </React.Fragment>
  )
}

Button.defaultProps = {
  text: false,
  children: null,
  _onClick: () => {},
  is_float: false,
  margin: false,
  width: false,
  padding: "10px",
  size: '15px'
}

const ElButton = styled.button`
  width: ${(props) => props.width};
  background-color: white;
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  cursor: pointer;
  border: none;
  font-size: ${(props) => props.size};
  ${(props)=> (props.margin ? `margin: ${props.margin}` : "")};
  outline: none;
`

export default Button