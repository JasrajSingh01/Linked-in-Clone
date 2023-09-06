import { React, useEffect, useState } from "react";
import {
  CalendarViewDay,
  Create,
  EventNote,
  Image,
  Subscriptions,
} from "@mui/icons-material";
import InputOptions from "./InputOptions";
import "../css/feed.css";
import Post from "./Post";
import { db } from "../firebaseFiles/firebase";
import {
  serverTimestamp,
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

function Feed() {
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);
  const postsCollection = collection(db, "posts");

  // Using the useEffect Hook for fetching the posts from the Firebase collection, Using await (Promise) to get data from pre-built Firebase function "getDocs" and then mapping the results
  useEffect(() => {
    const q = query(postsCollection, orderBy("timeStamp", "desc"));

    const querySnapshot = onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(posts);
    });

    return querySnapshot;
  }, []);

  const getName = posts.map((data) => {
    return data.name;
  });

  // Adding new posts in the Firebae collection using "addDoc" function
  const sendPost = async (e) => {
    e.preventDefault();
    await addDoc(postsCollection, {
      name: "Jas Saggu",
      description: "This is a test post",
      message: input,
      timeStamp: serverTimestamp(),
      photoUrl:
        "https://api.dicebear.com/7.x/adventurer/svg?seed=JasSaggu&skinColor=ecad80,f2d3b1",
    });
    setInput("");
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <Create />
          <form action="">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendPost} type="submit">
              Send
            </button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOptions Icon={Image} title="Photo" color="#70b5f9" />
          <InputOptions Icon={Subscriptions} title="Video" color="#e7a33e" />
          <InputOptions Icon={EventNote} title="Event" color="#c0cbcd" />
          <InputOptions
            Icon={CalendarViewDay}
            title="Write article"
            color="#7fc15e"
          />
        </div>
      </div>

      {/* Posts */}
      {posts.map((post) => (
        <Post
          key={post.id}
          name={post.name}
          description={post.description}
          message={post.message}
          photoUrl={post.photoUrl}
        />
      ))}
    </div>
  );
}

export default Feed;
