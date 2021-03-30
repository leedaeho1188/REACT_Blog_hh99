import React from "react";
import _ from "lodash";

const InfinityScroll = (props) => {

  const {children, callNext, is_next, loading} = props;

  const _handleScroll = _.throttle(() => {
    
  })

  return(
    <React.Fragment>

    </React.Fragment>
  )
}

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  is_next: false,
  loading: false,
}

export default InfinityScroll;