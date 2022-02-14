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

function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordConfirmRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    setError("");

    setLoading(true);

    const promises = [];
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value !== currentUser.password) {
      promises.push(updatePassword(passwordRef.current.value));
    }
    Promise.all(promises)
      .then(() => {
        history("/dashboard");
      })
      .catch(() => {
        setError("Failed to update account");
        setTimeout(() => {
          setError("");
        }, 3000);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="signup_container">
      <Header />

      <Container maxWidth="lg">
        <Card sx={{ maxWidth: 500, mt: 2 }}>
          <CardContent>
            <Typography variant="h4" component="div">
              Edit account
            </Typography>
            {error && <Alert severity="warning">{error}</Alert>}
            <form onSubmit={handleSubmit}>
              <Grid container direction="column">
                <Grid sx={{ mt: 2 }} item>
                  <TextField
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    label={currentUser.email}
                    inputRef={emailRef}
                    defaultValue={currentUser.email}
                    required
                    placeholder={currentUser.email}
                  />
                  <TextField
                    fullWidth
                    margin="dense"
                    label="Password"
                    type="password"
                    inputRef={passwordRef}
                    placeholder="Leave blank to keep the same"
                    autoComplete="current-password"
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    margin="dense"
                    id="outlined-password-input"
                    label="Password Confirmation"
                    type="password"
                    placeholder="Leave blank to keep the same"
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
                    Edit
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Typography sx={{ mt: 1.5 }}>
              <Link to="/dashboard"> Cancel</Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default UpdateProfile;
