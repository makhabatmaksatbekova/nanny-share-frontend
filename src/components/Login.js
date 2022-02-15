import React, { useRef, useState } from "react";
import {
  Card,
  Box,
  TextField,
  Button,
  CardContent,
  Alert,
} from "@mui/material/";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "./style/Signup.css";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./style/Login.css";

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
      history("/");
    } catch {
      setError("Failed to sign in");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
    setLoading(false);
  }

  return (
    <div className="login_container">
      <Container maxWidth="xl">
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flex: 3 }}>
            <img
              alt="background pic"
              src="https://static.wixstatic.com/media/11062b_26db38db0b28463ca6ef7d0dfc53a437~mv2.jpeg/v1/fill/w_1259,h_1051,al_c,q_85,usm_0.66_1.00_0.01/11062b_26db38db0b28463ca6ef7d0dfc53a437~mv2.webp"
            />
          </Box>
          <Box
            className="login_box"
            sx={{
              flex: 2,
              paddingTop: "100px !important",
            }}
          >
            <Card sx={{ maxWidth: 500 }}>
              <CardContent
                sx={{
                  paddingTop: "80px !important",
                  paddingBottom: "80px !important",
                  boxShadow: "1px 2px 10px wheat inset",
                }}
                className="login_form"
              >
                <Typography variant="h4" sx={{ ml: 5 }} component="div">
                  Welcome to NannyShare
                </Typography>
                {error && <Alert severity="warning">{error}</Alert>}
                <Box sx={{ maxWidth: 400 }}>
                  <form onSubmit={handleSubmit}>
                    <Box>
                      <Box sx={{ mt: 2, background: "white" }} item>
                        <TextField
                          fullWidth
                          margin="dense"
                          label="Email"
                          inputRef={emailRef}
                          required
                          variant="filled"
                        />

                        <TextField
                          fullWidth
                          margin="dense"
                          label="Password"
                          type="password"
                          inputRef={passwordRef}
                          autoComplete="current-password"
                          variant="filled"
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
                      </Box>
                    </Box>
                  </form>

                  <Typography sx={{ mt: 2 }}>
                    <Link to="/forgot-password">Forgot Password?</Link>
                  </Typography>
                  <Typography sx={{ mt: 1.5 }}>
                    Need an account ?<Link to="/signup"> Sign Up</Link>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Login;
