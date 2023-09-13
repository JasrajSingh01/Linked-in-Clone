import React, { useState } from "react";
import "../css/login.css";
import { Password, Input } from "../Utils/inputs";
import { Box, Button } from "@mui/material";
import { Send } from "@mui/icons-material";
import { auth } from "../firebaseFiles/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useDispatch();

  const loginFunc = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, pass)
      .then((auth) => {
        // Signed in
        const user = auth.user;
        const sDispatch = () => {
          dispatch(
            login({
              email: user.email,
              uid: user.uid,
              displayName: user.displayName,
              photoUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.displayName}&skinColor=ecad80,f2d3b1`,
            })
          );
        };
        sDispatch();
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        alert(error);
      });
  };

  const register = async () => {
    if (!name) {
      return alert("Please enter Name");
    }
    if (!email) {
      return alert("Please enter Email");
    }
    // Try-Catch block to get error message if any error is encountered
    try {
      // Creating a new user from email and password using createUserWithEmailAndPassword function imported form Firebase/auth
      // Required parameters for createUserWithEmailAndPassword(auth -> [exportde from firebase-config], email -> [from input field], password ->[from input field])
      createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          const user = userCredential.user;
          // Used UpdateProfile function form Firebase/auth to update username and profile image                    !!Very Important
          updateProfile(user, {
            displayName: name,
            photoURL: `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}&skinColor=ecad80,f2d3b1`,
          }).then(() => {
            dispatch(
              login({
                email: user.email,
                uid: user.uid,
                displayName: name,
                photoUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}&skinColor=ecad80,f2d3b1`,
              })
            );
          });
        })
        .catch((error) => {
          alert(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <img src="/linked-in.svg" alt="Linked-in" />
      <form action="">
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Password
          label="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
      </form>
      <Box
        alignSelf="center"
        justifyContent="center"
        justifySelf="center"
        mt={2}
      >
        <Button
          variant="contained"
          endIcon={<Send />}
          size="large"
          type="submit"
          sx={{
            backgroundColor: "#0288D1",
            "&:hover": {
              backgroundColor: "#006699",
            },
          }}
          onClick={loginFunc}
        >
          Sign In
        </Button>
      </Box>
      <p>
        Not a member?{" "}
        <span className="login__register" onClick={register}>
          Register Now
        </span>
      </p>
    </div>
  );
}

export default Login;
