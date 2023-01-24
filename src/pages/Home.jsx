import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Tilt from "react-parallax-tilt";
import { Button, Stack, Typography } from "@mui/material";
import parse from "html-react-parser";


const Home = () => {
  const [dot, setDot] = useState("...");
  const [data, setData] = useState([]);



  useEffect(() => {
    axios
      .get(
        `https://firestore.googleapis.com/v1/projects/the-digital-diary/databases/(default)/documents/posts`
      )
      .then((response) => {
        const newData = response.data.documents.map((doc) => ({
          id: doc.name.split("/")[doc.name.split("/").length - 1],
          ...doc.fields,
        }));
        setData(newData);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  console.log(data)


  return (
    <Stack className="home">
      <div className="posts">
        {data.map((post) => (
          <div className="post" key={post.id}>
            <Tilt>
              <div className="img" data-aos="fade-left">
                <img
                  className="postImg"
                  src={post.img.stringValue}
                  alt=""
                  data-tilt
                />
              </div>
            </Tilt>
            <div className="content" data-aos="fade-up-right">
              <Typography variant="h4" color="cyan">
                {post.title.stringValue}
              </Typography>
              <Typography
                variant="h5"
                color="whitesmoke"
                sx={{ textAlign: "justify", padding: "5px" }}
              >
                {parse(post.desc.stringValue.slice(0, 300))}
                {dot}
              </Typography>
              <Link className="link" to={`/post/${post.id}`} state={data}>
                <Button color="secondary">Read more</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Stack>
  );
};

export default Home;
