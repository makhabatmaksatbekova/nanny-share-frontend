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
import { useAuth } from "../contexts/AuthContext";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <div>
      <Card sx={{ maxWidth: 500 }}>
        <CardContent>
          <Typography variant="h4" component="div">
            Sign Up
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
                <TextField
                  fullWidth
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
            Already have an account? Log In
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;
