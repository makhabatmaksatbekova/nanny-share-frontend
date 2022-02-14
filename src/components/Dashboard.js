import React, { useState } from "react";
import {
  Card,
  Grid,
  Box,
  TextField,
  Container,
  Button,
  CardContent,
  Typography,
  Alert,
} from "@mui/material/";
import "./style/Dashboard.css";
import Header from "./Header";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <Box minHeight="100vh">
      <Header />
      <Container>
        <Card sx={{ maxWidth: 500, mt: 2 }}>
          <CardContent>
            <Typography variant="h4" component="div">
              Account
            </Typography>
            <Typography variant="h6" component="div">
              <strong>Email:</strong> {currentUser.email}
            </Typography>
            <Link to="/update-profile">
              <Button sx={{ mt: 1 }} fullWidth variant="contained">
                {" "}
                Edit Account
              </Button>
            </Link>

            {error && <Alert severity="warning">{error}</Alert>}

            <Button sx={{ mt: 1 }} onClick={handleLogout}>
              Log out
            </Button>
            <Typography sx={{ mt: 1 }}>
              Need an account ?<Link to="/signup"> Sign Up</Link>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Dashboard;
