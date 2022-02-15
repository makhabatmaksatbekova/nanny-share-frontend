import React, { useRef, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {
  Card,
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
import "./style/Contact.css";
import "./style/Login.css";

const Contact = () => {
  const currentUser = firebase.auth().currentUser;
  const [error, setError] = useState("");
  console.log(currentUser, "user");

  return (
    <div className="login_container">
      <Container maxWidth="xl">
        <Header />

        <Box sx={{ display: "flex" }}>
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
                  Contact to family
                </Typography>
                {error && <Alert severity="warning">{error}</Alert>}
                <Box sx={{ maxWidth: 400 }}>
                  <form
                    action="https://formsubmit.co/maksatbekova.m@gmail.com"
                    method="POST"
                  >
                    <Box>
                      <Box sx={{ mt: 2, background: "white" }} item>
                        <TextField
                          fullWidth
                          margin="dense"
                          label="Name"
                          variant="filled"
                          required
                        />
                        <TextField
                          fullWidth
                          margin="dense"
                          label="Email"
                          defaultValue={currentUser.email}
                          required
                          variant="filled"
                        />
                        <TextField
                          className="contact_message"
                          fullWidth
                          margin="dense"
                          label="Message"
                          required
                          variant="filled"
                          multiline
                          rows={4}
                        />

                        <Button
                          sx={{ mt: 1 }}
                          fullWidth
                          variant="contained"
                          type="submit"
                        >
                          Send
                        </Button>
                      </Box>
                    </Box>
                  </form>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Contact;
