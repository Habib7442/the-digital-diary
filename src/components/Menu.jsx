import { useState, useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Link, useLocation } from "react-router-dom";
import { db } from "../firebase";

const Menu = ({ cat }) => {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState([]);

  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const getPost = async () => {
      try {
        const q = query(
          collection(db, "posts"),
          // where("cat", "==", cat?.stringValue)
        );
        const querySnapshot = await getDocs(q);
        let tempData = [];
        let id = [];
        querySnapshot.forEach((doc) => {
          tempData.push(doc.data());
          id.push(doc.id);
        });
        setPosts(tempData);
        setId(id);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPost();
  }, [cat?.stringValue]);

  return (
    <div className="menu">
      <h1>Other post</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={post.img} alt="" />
          <h2>{parse(post.desc.slice(0, 300))}</h2>
          <Link className="link" to={`/post/${id[posts.indexOf(post)]}`}>
            <button>Read more</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Menu;
