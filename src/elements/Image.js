import styled from 'styled-components';
import React from "react";

const Image = (props) => {
  const {shape, src, size} = props

  const styles = {
    src: src,
    size: size,
  }
  
  if(shape === "circle"){
      return (
          <ImageCircle {...styles}></ImageCircle>
      )
  }

  if(shape === "rectangle"){
      return (
          <AspectOutter>
              <AspectInner {...styles}></AspectInner>
          </AspectOutter>
      )
  }
}

Image.defaultProps = {
  shape: "rectangle",
  src: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  size: 36,
}

const ImageDefault = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
`

const AspectOutter = styled.div`
  width: 90%;
`
const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`
const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);

  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 4px;
`

export default Image;