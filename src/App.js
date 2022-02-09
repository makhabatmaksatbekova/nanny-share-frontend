import React from "react";
import Content from "./components/Content";
import Families from "./components/ListAllFamilies";
import Container from "@mui/material/Container";
import Header from "./components/Header";
import "./components/style/App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />

        <Container maxWidth="lg" className="container">
          <Content />
          {/* <Link to="/signup">
            <Typography variant="h6" component="span">
              Signup
            </Typography>
          </Link>{" "}
          <Link to="/login">
            <span>/ </span>
            <Typography variant="h6" component="span">
              Login
            </Typography>
          </Link> */}
        </Container>
      </div>
    </AuthProvider>
  );
}

export default App;
