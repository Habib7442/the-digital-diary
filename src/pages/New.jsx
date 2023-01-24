import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link, useLocation } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import parse from "html-react-parser";
import Tilt from "react-parallax-tilt";

const New = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const getPost = async () => {
      try {
        const cat = new URLSearchParams(location.search).get("cat");
        const q = query(collection(db, "posts"), where("cat", "==", cat));
        const querySnapshot = await getDocs(q);
        let tempData = [];
        let id = [];
        querySnapshot.forEach((doc) => {
          tempData.push(doc.data());
          // setId(doc.id);
          id.push(doc.id);
        });
        setData(tempData);
        setId(id);
      } catch (error) {
        console.log(error.response.message);
      }
    };
    getPost();
  }, [location.search]);


  console.log(data);
  return (
    <Stack className="home">
      <div className="posts">
        {data.map((post, index) => (
          <div className="post" key={post?.id}>
            <Tilt>
              <div className="img" data-aos="flip-left">
                <img className="postImg" src={post?.img} alt="" data-tilt />
              </div>
            </Tilt>
            <div className="content" data-aos="flip-right">
              <Typography variant="h4" color="cyan">
                {post?.title}
              </Typography>
              <Typography
                variant="h5"
                color="whitesmoke"
                sx={{ textAlign: "justify", padding: "5px" }}
              >
                {parse(post?.desc.slice(0, 300))}
              </Typography>
              <Link className="link" to={`/post/${id[0]}`}>
                <Button color="secondary">Read more</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Stack>
  );
};

export default New;
