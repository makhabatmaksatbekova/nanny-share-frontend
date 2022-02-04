import React, { useRef, useState } from "react";
import {
  Card,
  Grid,
  TextField,
  Button,
  CardContent,
  Alert,
} from "@mui/material/";

import Typography from "@mui/material/Typography";
import Header from "./Header";
import Container from "@mui/material/Container";
import "./style/Signup.css";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history("/dashboard");
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  }

  return (
    <div className="signup_container">
      <Container maxWidth="lg">
        <Header />

        <Card sx={{ maxWidth: 500, mt: 2 }}>
          <CardContent>
            <Typography variant="h4" component="div">
              Log In
            </Typography>
            {error && <Alert severity="warning">{error}</Alert>}
            <form onSubmit={handleSubmit}>
              <Grid container direction="column">
                <Grid sx={{ mt: 2 }} item>
                  <TextField
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    label="Email"
                    inputRef={emailRef}
                    required
                    placeholder="Email"
                  />
                  <TextField
                    fullWidth
                    margin="dense"
                    label="Password"
                    type="password"
                    inputRef={passwordRef}
                    placeholder="password"
                    autoComplete="current-password"
                    variant="outlined"
                  />

                  <Button
                    sx={{ mt: 1 }}
                    fullWidth
                    variant="contained"
                    type="submit"
                    disabled={loading}
                  >
                    Log In
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Typography sx={{ mt: 2 }}>
              <Link to="/forgot-password">Forgot Password?</Link>
            </Typography>
            <Typography sx={{ mt: 1.5 }}>
              Need an account ?<Link to="/signup"> Sign Up</Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default Login;
