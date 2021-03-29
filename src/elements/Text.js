import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const {bold, color, size, children, margin} = props

  const styles = {bold: bold, color: color, size: size, margin: margin}

  return (
    <P {...styles}>
      {children}
    </P>
  )
}

Text.defaultProps = {
  children: null,
  bold: false,
  size: "14px",
  margin: false,
  color: "#222831",
}
const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold? "600" : "400")};
  ${(props) => (props.marin? `margin: ${props.margin}` : '')}
`
export default Text;
