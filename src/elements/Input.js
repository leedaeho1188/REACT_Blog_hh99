import React from "react"
import styled from "styled-components";

const Input = (props) => {
  const {label, placeholder, _onChange, type, multiLine, value, is_submit, onSubmit} = props
  return (
    <React.Fragment>

    </React.Fragment>
  )
}

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  value: "",
  is_submit: false,
  onSubmit: () => {},
  _onChange: () => {},
}

const ElInput = styled.input`
  border: 1px solid #212121;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`

export default Input