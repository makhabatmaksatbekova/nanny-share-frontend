import React from "react";
import Content from "./components/Content";
import Container from "@mui/material/Container";
import Header from "./components/Header";
import "./components/style/App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

function App() {
  // state
  const [nannies, setNannies] = useState([]);
  const nanniesCollectionRef = collection(db, "nannies");

  // async function, API retuns promise
  // useEffect(() => {
  //   const getNannies = async () => {};
  //   getNannies();
  // }, []);
  return (
    <AuthProvider>
      <div className="App">
        <Container maxWidth="lg" className="container">
          <Header />
          <Content />
          <Link to="/signup">
            <Typography variant="h6" component="span">
              Signup
            </Typography>
          </Link>{" "}
          <Link to="/login">
            <span>/ </span>
            <Typography variant="h6" component="span">
              Login
            </Typography>
          </Link>
        </Container>
      </div>
    </AuthProvider>
  );
}

export default App;
