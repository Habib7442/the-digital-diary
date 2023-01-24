import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import JoditEditor from "jodit-react";
import { db } from "../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const Write = (props) => {
  const editor = useRef(null);
  const state = useLocation().state;
  const [desc, setDesc] = useState(state?.desc?.stringValue || "");
  const [title, setTitle] = useState(state?.title?.stringValue || "");
  const [userName, setUserName] = useState(state?.userName?.stringValue || "");
  const [linkedin, setLinkedin] = useState(state?.linkedin?.stringValue || "");
  const [instagram, setInstagram] = useState(
    state?.instagram?.stringValue || ""
  );
  const [cat, setCat] = useState(state?.cat?.stringValue || "");
  const [imageUpload, setImageUpload] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [imageList, setImageList] = useState([]);

  const navigate = useNavigate();
  const postId = useLocation().search.split("=")[1];

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (imageUpload === null) return;
      if (profilePicture === null) return;
      //upload image
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      uploadBytes(imageRef, imageUpload).then(async (snapshot) => {
        const imgUrl = await getDownloadURL(snapshot.ref).then((url) => {
          setImageList((prev) => [...prev, url]);
          return url;
        });
        //upload profile picture
        const profilePictureRef = ref(
          storage,
          `profile-pictures/${profilePicture.name + v4()}`
        );
        uploadBytes(profilePictureRef, profilePicture).then(
          async (snapshot) => {
            const profilePictureUrl = await getDownloadURL(snapshot.ref);
            // Add post data to firestore
            addDoc(collection(db, "posts"), {
              title: title,
              desc: desc,
              cat: cat,
              userName: userName,
              linkedin: linkedin,
              instagram: instagram,
              img: imgUrl,
              profilePicture: profilePictureUrl,
            });
          }
        );
      });
      navigate("/");
      alert("Post created successfully!");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const imgRef = ref(storage, state?.img?.stringValue);
      const profilePictureRef = ref(storage, state?.profilePicture?.stringValue);
      // console.log(imgRef);
      getDownloadURL(imgRef, profilePictureRef).then((url) => {
        setImageList(url);
        setDoc(doc(db, "posts", postId), {
          title: title,
          desc: desc,
          cat: cat,
          userName: userName,
          linkedin: linkedin,
          instagram: instagram,
          img: url,
          profilePicture: url[1],

        });
        alert("Post updated successfully!");
        navigate("/");
        setDoc();
      });
    } catch (err) {
      console.log(err.response);
    }
  };
  return (
    <div className="createPost">
      <div className="content">
        <input
          type="text"
          value={title}
          placeholder="Content Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={userName}
          placeholder="UserName"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          value={linkedin}
          placeholder="LinkedIn Profile Link"
          onChange={(e) => setLinkedin(e.target.value)}
        />
        <input
          type="text"
          value={instagram}
          placeholder="Instagram Profile Link"
          onChange={(e) => setInstagram(e.target.value)}
        />
        <div className="editorContainer">
          <JoditEditor ref={editor} value={desc} onChange={setDesc} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish (Image size should be less than 2mb)</h1>
          <span>
            <b>Status: </b>Draft
          </span>
          <span>
            <b>Visibility: </b>Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setImageUpload(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Content Image <span style={{ color: "red" }}>* required</span>
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            id="profile-picture"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
          <label htmlFor="profile-picture" className="file">
            Upload Profile Picture (
            <span style={{ color: "red" }}>* required</span>)
          </label>

          <div className="buttons">
            {state ? (
              <button onClick={handleUpdate}>Update Post</button>
            ) : (
              <button onClick={handleClick}>Publish</button>
            )}
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "coding"}
              name="cat"
              value="coding"
              id="coding"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="coding">Coding</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "movie"}
              name="cat"
              value="movie"
              id="movie"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="movie">Movie</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "sports"}
              name="cat"
              value="sports"
              id="sports"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="sports">Sports</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "business"}
              name="cat"
              value="business"
              id="business"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="business">Business</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
