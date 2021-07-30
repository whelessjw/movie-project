import React, { useEffect } from "react";

const WatchList = (props) => {
  useEffect(() => {
    props.fetchMovies();
  }, [props, props.fetchMovies]);

  return <div>{props.children}</div>;
};

export default WatchList;
