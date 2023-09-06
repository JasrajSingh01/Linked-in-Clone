import React, { useState } from "react";
import "../css/login.css";
import { Password, Input } from "../Utils/inputs";
import { Box, Button } from "@mui/material";
import { Send } from "@mui/icons-material";
import { auth } from "../firebaseFiles/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();

  // const loginFunc = (e) => {
  //   e.preventDefault();
  //   // auth
  // };

  const register = async () => {
    if (!name) {
      return alert("Please enter Name");
    }
    if (!email) {
      return alert("Please enter Email");
    }
    setProfilePic(
      "https://api.dicebear.com/7.x/adventurer/svg?seed=" +
        name +
        "&skinColor=ecad80,f2d3b1"
    );
    try {
      await createUserWithEmailAndPassword(auth, email, pass)
        .then((auth) => {
          updateProfile(auth, {
            displayName: name,
            photoURL: profilePic,
          }).then(() => {
            dispatch(
              login({
                email: auth.user.email,
                uid: auth.user.uid,
                displayName: name,
                photoURL: profilePic,
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
          onClick={login}
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
