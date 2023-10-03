import { React, useEffect, useState } from "react";
import "../css/dialog.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Dropzone from "../Utils/Dropzone";
import { Caption } from "../Utils/inputs";
import { Button, FormHelperText, Typography } from "@mui/material";
import { db, storage } from "../firebaseFiles/firebase";
import {
  addDoc,
  arrayUnion,
  // serverTimestamp,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  // addDoc,
  // onSnapshot,
  // orderBy,
  // query,
} from "firebase/firestore";
// import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { ValidCaption } from "../Utils/validations";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { useRef } from "react";

export default function FormDialog({ open, setOpen }) {
  const user = useSelector(selectUser);
  const [files, setFiles] = useState([]);

  // Input Field States
  const [caption, setCaption] = useState("");
  // const captionRef = useRef();

  //Validation Errors
  const [captionErr, setCaptionErr] = useState(false);

  // Connection with firebase collection (DB)
  const postsCollection = collection(db, "posts");

  // UseEffect for clearing caption whenever modal is closed
  useEffect(() => {
    setCaption("");
    setCaptionErr(false);
  }, []);

  // Adding new posts in the Firebae collection using "addDoc" function
  const uploadPost = async (e) => {
    e.preventDefault();

    if (!ValidCaption.test(caption)) {
      setCaptionErr(true);
    } else {
      setCaptionErr(false);
      const docRef = await addDoc(postsCollection, {
        name: user.displayName,
        description: user.email,
        message: caption,
        photoUrl: user.photoUrl || "",
        timeStamp: serverTimestamp(),
      });
      // setOpen(false);
      // setCaption("");
      await Promise.all(
        files.map((file) => {
          const imageRef = ref(storage, `posts/${docRef.id}/${file.path}`);
          uploadBytes(imageRef, file, "data_url").then(async () => {
            const downlaodURL = await getDownloadURL(imageRef);
            await updateDoc(doc(postsCollection, docRef.id), {
              image: arrayUnion(downlaodURL),
            });
          });
        })
      );
      setOpen(false);
      setCaption("");
      setCaptionErr(false);
      setFiles([]);
    }
  };

  const closeDialog = () => {
    setOpen(false);
    setFiles([]);
    setCaption("");
    setCaptionErr(false);
  };

  return (
    <>
      <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="md">
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
          {captionErr && (
            <FormHelperText className="helper__Text">
              Please enter only Alphabets
            </FormHelperText>
          )}
          <Dropzone files={files} setFiles={setFiles} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>
            <Typography variant="p">Cancel</Typography>
          </Button>
          <Button onClick={uploadPost}>
            <Typography variant="p">Upload</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
