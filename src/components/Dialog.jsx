import { React, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SingleFile from "../Utils/SingleFile";
import { Caption } from "../Utils/inputs";
import { Button, Typography } from "@mui/material";
import { db } from "../firebaseFiles/firebase";
import {
  serverTimestamp,
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";

export default function FormDialog({ open, close }) {
  const user = useSelector(selectUser);
  const [caption, setCaption] = useState("");
  const [file, setfile] = useState();

  // Connection with firebase collection (DB)
  const postsCollection = collection(db, "posts");

  // Adding new posts in the Firebae collection using "addDoc" function
  const uploadPost = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please attach a file!!");
    } else {
      await addDoc(postsCollection, {
        name: user.displayName,
        description: user.email,
        message: caption,
        photoUrl: user.photoUrl || "",
        timeStamp: serverTimestamp(),
      });
      setCaption("");
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={close} fullWidth maxWidth="md">
        <DialogTitle>
          <Typography variant="h6" component="div">
            Editor
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Caption
            placeholder="Start Typing..."
            fullWidth
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <SingleFile />
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>
            <Typography variant="p">Cancel</Typography>
          </Button>
          {/* <Button onClick={uploadPost}>
            <Typography variant="p">Upload</Typography>
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
