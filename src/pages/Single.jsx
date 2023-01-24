import React, { useContext, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../context/authContext";
import { Avatar } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";

const Single = () => {
  const [post, setPost] = useState([]);
  let data = post?.desc?.stringValue;
  const [date, setDate] = useState("");
  const [likes, setLikes] = useState(parseInt(0));
  

  const location = useLocation();
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];
  const shareUrl = `https://the-digital-diary.web.app/post/${postId}`;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://firestore.googleapis.com/v1/projects/the-digital-diary/databases/(default)/documents/posts/${postId}`
        );
        setPost(res?.data?.fields);
        setDate(res.data.createTime);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [postId]);
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await axios.get(
          `https://firestore.googleapis.com/v1/projects/the-digital-diary/databases/(default)/documents/likes/${postId}`
        );
        console.log(res?.data?.fields?.likes?.integerValue)
        setLikes(res?.data?.fields?.likes?.integerValue);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchLikes();
  }, [postId]);


  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(
          `https://firestore.googleapis.com/v1/projects/the-digital-diary/databases/(default)/documents/posts/${postId}`
        );
        navigate("/");
      } catch (error) {
        console.log(error.message);
      }
    }
  };


  const handleLike = async () => {
    try {
      const res = await axios.patch(
        `https://firestore.googleapis.com/v1/projects/the-digital-diary/databases/(default)/documents/likes/${postId}`,
        {
          fields: {
            likes: {
              integerValue:  +likes + +1,
            },
          },
        }
      );
      setLikes(res?.data?.fields?.likes?.integerValue);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  

  console.log(likes)

  return (
    <div className="single">
      <div className="content">
        <img src={post?.img?.stringValue} alt="" />
        <div className="user">
          <Avatar
            alt="Remy Sharp"
            src={post?.profilePicture?.stringValue}
            sx={{ width: 56, height: 56 }}
          />
          <div className="info">
            <span>{post?.userName?.stringValue}</span>
            <span>Posted: {moment(date).fromNow()}</span>
          </div>
          {currentUser && (
            <div className="edit">
              <Link to={`/write?edit=${postId}`} state={post}>
                <EditIcon />
              </Link>
              <Link onClick={handleDelete}>
                <DeleteIcon />
              </Link>
              {/* <button onClick={handleLike}>{likes}Like</button> */}
            </div>
          )}
          <div className="social">
            <a
              href={post?.linkedin?.stringValue}
              target="_blank"
              className="text-muted"
            >
              <LinkedInIcon />
            </a>
            <a
              href={post?.instagram?.stringValue}
              target="_blank"
              className="text-muted"
            >
              <InstagramIcon className="socialIcon" />
            </a>
          </div>
          <div className="sharing">
            <FacebookShareButton className="sharingIcon" url={shareUrl}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <WhatsappShareButton className="sharingIcon" url={shareUrl}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <LinkedinShareButton className="sharingIcon" url={shareUrl}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>

            <ThumbUpIcon className="sharingIcon" style={{cursor: "pointer"}} onClick={handleLike} /> <span>{likes} likes</span>
          </div>
        </div>
        <h1>{post?.title?.stringValue}</h1>
        <p dangerouslySetInnerHTML={{ __html: data }}></p>
      </div>
      <div className="menu">
        {post?.cat && <Menu cat={post?.cat} state={postId} />}
      </div>
    </div>
  );
};

export default Single;
