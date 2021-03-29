import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {is_flex, width, margin, padding, bg, children, center, _onClick, justify, display, align } = props

  const styles = {
    is_flex: is_flex,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    center: center,
    justify: justify,
    display: display,
    align: align,
  };

  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick} >{children}</GridBox>
    </React.Fragment>
  )
}

Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
  _onClick: () => {},
  justify: false,
  display: "block",
  align: false,
}

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")};
  ${(props) => (props.display ? `display: ${props.display};` : "")};
  ${(props) => (props.align ? `align-items: ${props.align};` : "")};
  ${(props) => (props.center? `text-align: center;` : "")};
  ${(props) => (props.justify? `justify-content: ${props.justify};` : "")};
`

export default Grid