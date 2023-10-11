import { Box, Button } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { Input, Password } from "../Utils/inputs";
import { ValidEmail } from "../Utils/validations";
import "../css/register.css";
import { login } from "../features/userSlice";
import { auth } from "../firebaseFiles/firebase";

function Login() {
  // TextField States
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const Navigate = useNavigate();

  // Loading State
  const [loading, setLoading] = useState(false);

  //Dispatcher
  const dispatch = useDispatch();

  const loginFunc = (e) => {
    e.preventDefault();
    if (!email || !ValidEmail.test(email)) {
      return alert("Please enter a valid Email");
    }
    if (!pass) {
      return alert("Please enter Password");
    }
    setLoading(true);
    setTimeout(() => {
      try {
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
            Navigate("/");
          })
          .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            alert(error);
          });
      } catch (error) {
        console.log(error);
      }
    }, 2000);
    setLoading(false);
  };

  return (
    <div className="login">
      {loading ? (
        <BarLoader loading={loading} color="#0288d1" size={30} />
      ) : (
        <>
          <img src="/linked-in.svg" alt="Linked-in" />
          <form action="">
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
              onClick={loginFunc}
            >
              Sign In
            </Button>
          </Box>
          <Box
            alignSelf="center"
            justifyContent="center"
            justifySelf="center"
            mt={2}
            sx={{
              width: "100%",
            }}
          >
            <Button
              variant="outlined"
              size="large"
              fullWidth
              type="submit"
              disableElevation
              sx={{
                borderRadius: "20px",
                borderColor: "#000",
                color: "#000",
                "&:hover": {
                  backgroundColor: "#00000008",
                  borderColor: "#000",
                },
              }}
              onClick={() => {
                Navigate("/register");
              }}
            >
              New to LinkedIn? Join Now
            </Button>
          </Box>
        </>
      )}
    </div>
  );
}

export default Login;
