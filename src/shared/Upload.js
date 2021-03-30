import React from "react";

import {useDispatch, useSelector} from "react-redux";
import {actionCreators as imageActions} from "../redux/modules/image"

const Upload = (props) => {
  const dispatch = useDispatch();
  const is_uploading = useSelector(state => state.image.uploading)
  const fileInput = React.useRef();

  const selectFile = () => {
    console.log(fileInput.current.files[0])
    const reader = new FileReader();
    const file = fileInput.current.files[0]
    if (file == undefined){
      dispatch(imageActions.setPreview("http://via.placeholder.com/400x300"))
      return
    }
    reader.readAsDataURL(file);
  
    reader.onloadend = () => {
      console.log(reader.result);
      dispatch(imageActions.setPreview(reader.result))
    }
  }
  
  return(
    <>
      <input type="file" onChange={selectFile} ref={fileInput} disabled={is_uploading} />
      {/* <button onClick={uploadFB}>업로드하기</button> */}
    </>
  )
}

export default Upload