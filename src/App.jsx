import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import { login, logout, selectUser } from "./features/userSlice";
import Register from "./components/Register";
import { auth } from "./firebaseFiles/firebase";
import { BarLoader } from "react-spinners";
import { Route, Routes, useNavigate } from "react-router-dom";
import SignIn from "./components/SignIn";

function App() {
  // Loading
  const [loading, setLoading] = useState(false);
  //User Selector
  const user = useSelector(selectUser);
  //Dispatcher
  const dispatch = useDispatch();
  // Navigator
  const Navigate = useNavigate();

  // UseEffect for loading
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    auth.onAuthStateChanged((user) => {
      if (user != null) {
        // User is logged in
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
            photoUrl: user.photoURL,
          })
        );
        Navigate("/");
      } else {
        // User is logged out
        dispatch(logout());
        Navigate("/signIn");
      }
    });
    // console.log(user);
  }, []);

  return (
    <>
      <div className="app">
        {loading ? (
          <div className="loader">
            <BarLoader loading={loading} color="#0288d1" size={30} />
          </div>
        ) : (
          <div>
            <Header />
            {!user ? (
              <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/signIn" element={<SignIn />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            )}
            {/* {user && (
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            )} */}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
