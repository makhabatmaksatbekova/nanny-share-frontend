import React, { useRef, useState } from "react";
import {
  Card,
  Grid,
  Box,
  TextField,
  Button,
  CardContent,
  Alert,
} from "@mui/material/";

import Typography from "@mui/material/Typography";
import Header from "./Header";
import Container from "@mui/material/Container";
import "./style/Signup.css";
import "./style/ContainerBg.css";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history("/");
    } catch {
      setError("Failed to create an account");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
    setLoading(false);
  }

  return (
    <Grid className="containerBg signup_container">
      <Grid
        className="signup_box"
        sx={{
          maxWidth: 500,
          padding: "80px !important",
          background: "white",
          marginTop: "100px",
          boxShadow: "1px 2px 10px wheat inset",
        }}
      >
        <Grid container>
          <Grid>
            <Typography variant="h4" component="div">
              Sign Up
            </Typography>
          </Grid>
        </Grid>
        {error && <Alert severity="warning">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <Grid container direction="column">
            <Grid sx={{ mt: 2 }} item className="signup_form">
              <TextField
                variant="filled"
                fullWidth
                margin="dense"
                label="Email"
                inputRef={emailRef}
                required
                sx={{ background: "white" }}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Password"
                type="password"
                inputRef={passwordRef}
                autoComplete="current-password"
                variant="filled"
                sx={{ background: "white" }}
              />
              <TextField
                fullWidth
                variant="filled"
                margin="dense"
                id="outlined-password-input"
                label="Password Confirmation"
                type="password"
                autoComplete="current-password"
                inputRef={passwordConfirmRef}
              />
              <Button
                sx={{ mt: 1 }}
                fullWidth
                variant="contained"
                type="submit"
                disabled={loading}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
        <Typography sx={{ mt: 1.5 }}>
          Already have an account? <Link to="/login"> Log In</Link>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Signup;
