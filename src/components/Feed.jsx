import { CalendarViewDay, Create, EventNote, Image } from "@mui/icons-material";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import moment from "moment/moment";
import { React, useEffect, useState } from "react";
import FlipMove from "react-flip-move";
import { useSelector } from "react-redux";
import "../css/feed.css";
import { selectUser } from "../features/userSlice";
import { db } from "../firebaseFiles/firebase";
import Dialog from "./Dialog";
import InputOptions from "./InputOptions";
import Post from "./Post";
import PostSkeleton from "./PostSkeleton";

function Feed() {
  // Loading State
  const [isLoading, setIsLoading] = useState(true);
  // User Selector
  const user = useSelector(selectUser);
  // Post Input
  const [input, setInput] = useState("");
  // Posts
  const [posts, setPosts] = useState([]);
  // Modal
  const [open, setOpen] = useState(false);
  const close = () => {
    setOpen(false);
    // setCaption("");
  };

  // Connection with firebase collection (DB)
  const postsCollection = collection(db, "posts");

  // Using the useEffect Hook for fetching the posts from the Firebase collection, Using await (Promise) to get data from pre-built Firebase function "getDocs" and then mapping the results
  useEffect(() => {
    const q = query(postsCollection, orderBy("timeStamp", "desc"));

    const querySnapshot = onSnapshot(q, (snapshot) => {
      setTimeout(() => {
        const posts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(posts);
        setIsLoading(false);
      }, 2000);
    });
    return querySnapshot;
  }, []);

  // Adding new posts in the Firebae collection using "addDoc" function
  const sendPost = async (e) => {
    e.preventDefault();

    if (!input) {
      alert("Please enter valid input!!");
    } else {
      await addDoc(postsCollection, {
        name: user.displayName,
        description: user.email,
        message: input,
        photoUrl: user.photoUrl || "",
        timeStamp: serverTimestamp(),
      });
      setInput("");
    }
  };

  return (
    <>
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
            <InputOptions
              Icon={Image}
              title="Media"
              color="#70b5f9"
              onClick={() => {
                setOpen(true);
              }}
            />
            <InputOptions Icon={EventNote} title="Event" color="#c0cbcd" />
            <InputOptions
              Icon={CalendarViewDay}
              title="Write article"
              color="#7fc15e"
            />
          </div>
        </div>

        {/* Posts */}
        {/* <PostSkeleton posts={1} id={posts.map(({ id }) => id)} /> */}
        {!posts.length && isLoading ? (
          <PostSkeleton posts={4} id={posts.map(({ id }) => id)} />
        ) : (
          <FlipMove>
            {posts.map(({ id, timeStamp, name, message, photoUrl, image }) => (
              <>
                <Post
                  id={id}
                  name={name}
                  image={image}
                  description={moment(
                    timeStamp?.toDate().toString()
                  ).calendar()}
                  message={message}
                  photoUrl={photoUrl}
                />
              </>
            ))}
          </FlipMove>
        )}
      </div>
      <Dialog open={open} close={close} setOpen={setOpen} />
    </>
  );
}

export default Feed;
