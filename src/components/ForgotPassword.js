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

function ForgotPassword() {
  const emailRef = useRef();
  const history = useNavigate();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
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
              Forgot Password
            </Typography>
            {error && <Alert severity="warning">{error}</Alert>}
            {message && <Alert severity="success">{message}</Alert>}
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

                  <Button
                    sx={{ mt: 1 }}
                    fullWidth
                    variant="contained"
                    type="submit"
                    disabled={loading}
                  >
                    Reset Password
                  </Button>
                </Grid>
              </Grid>
            </form>

            <Typography sx={{ mt: 1.5 }}>
              Need an account ?<Link to="/login"> Login</Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default ForgotPassword;
