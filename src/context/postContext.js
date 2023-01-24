import React, { createContext, useState } from "react";

export const PostContext = createContext();

export const PostProvider = (props) => {
  const [post, setPost] = useState({});

  return (
    <PostContext.Provider value={[post, setPost]}>
      {props.children}
    </PostContext.Provider>
  );
};
