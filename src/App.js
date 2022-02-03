import React from "react";
import Content from "./components/Content";
import Container from "@mui/material/Container";
import Header from "./components/Header";
import "./components/style/App.css";
import Signup from "./components/Signup";
import { AuthProvider } from "./contexts/AuthContext";
function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Container maxWidth="lg" className="container">
          <Header />
          <Content />
          <Signup />
        </Container>
      </div>
    </AuthProvider>
  );
}

export default App;
