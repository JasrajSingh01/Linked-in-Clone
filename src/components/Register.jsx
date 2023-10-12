import { Box, Button } from "@mui/material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { Input, Password } from "../Utils/inputs";
import "../css/register.css";
import { login } from "../features/userSlice";
import { auth } from "../firebaseFiles/firebase";

function Login() {
  // TextField States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  // Navigation State
  const Navigate = useNavigate();

  // Loading
  const [loading, setLoading] = useState(true);

  //Dispatcher
  const dispatch = useDispatch();

  const register = async (e) => {
    e.preventDefault();
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
          // !!Very Important
          // Used UpdateProfile function form Firebase/auth to update username and profile image
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
      Navigate("/");
    } catch (error) {
      // console.log(error);
    }
    // setTimeout(() => {
    setLoading(false);
    // }, 2000);
  };

  return (
    <>
      {loading ? (
        <BarLoader loading={loading} color="#0288d1" size={30} />
      ) : (
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
          {/* <Box
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
              onClick={register}
            >
              
            </Button>
          </Box> */}
          <Box
            alignSelf="center"
            justifyContent="center"
            justifySelf="center"
            mt={2}
            sx={{
              width: "100%",
              textTransform: "initial",
            }}
          >
            <Button
              variant="contained"
              size="large"
              fullWidth
              type="submit"
              sx={{
                borderRadius: "20px",
                backgroundColor: "#0a66c2",
                "&:hover": {
                  backgroundColor: "#095096",
                },
              }}
              onClick={register}
            >
              Sign Up
            </Button>
          </Box>
          <p>
            Already a member?{" "}
            <span
              className="login__register"
              onClick={() => {
                Navigate("/SignIn");
              }}
              // onClick={register}
            >
              Sign In
            </span>
          </p>
        </div>
      )}
    </>
  );
}

export default Login;
