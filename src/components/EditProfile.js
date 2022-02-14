import React, { useRef, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import useCreateProfile from "./FamilyProfileHooks";
import ProfilePicture from "./ProfilePicture";
import SendIcon from "@mui/icons-material/Send";
import Header from "./Header";
import "./style/EditProfile.css";
import {
  Card,
  Grid,
  Container,
  TextField,
  Button,
  CardContent,
  Typography,
  Box,
} from "@mui/material/";
import { db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  query,
  where,
} from "firebase/firestore";

const EditProfile = () => {
  const {
    handleProfileSubmit,
    handleInputChange,
    updateFamilyProfile,
    inputs,
  } = useCreateProfile();

  const currentUser = firebase.auth().currentUser;
  const familiesCollectionRef = collection(db, "families");
  const [family, setFamily] = useState([]);
  const [updatedInput, setUpdate] = useState([]);

  const q = query(familiesCollectionRef, where("uid", "==", currentUser.uid));

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(q);
      setFamily(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getData();
  }, []);

  const update = () => {
    console.log("update");
  };

  return (
    <Box minHeight="100vh">
      <Header />
      {family.map((data) => {
        return (
          <Grid
            key={data.id}
            maxWidth="lg"
            container
            direction="row"
            justifyContent="center"
            sx={{
              mt: 5,
            }}
          >
            <Grid item xs={12} md={6}>
              <Grid sx={{ mt: 5 }}>
                <ProfilePicture />
              </Grid>
            </Grid>

            <Grid
              item
              key={data.id}
              sx={{
                maxWidth: 600,
                boxShadow: "0px 0px 7px #1c2843 ",
                padding: "30px",

                background: "white",
              }}
            >
              <Box component="form" onSubmit={update}>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  sx={{
                    background: "white",
                  }}
                >
                  <Grid
                    item
                    sx={{
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{
                        background: "white",
                      }}
                    >
                      Edit Profile
                    </Typography>
                  </Grid>

                  <Grid xs={8} item className="form_container">
                    <TextField
                      name="familyName"
                      label="Family name"
                      // onChange={handleInputChange}
                      defaultValue={data.familyName}
                      variant="filled"
                      fullWidth
                      required
                    />
                    <TextField
                      name="address"
                      label="address"
                      // onChange={handleInputChange}
                      defaultValue={data.address}
                      fullWidth
                      required
                      variant="filled"
                    />

                    <TextField
                      name="rate"
                      label="rate"
                      fullWidth
                      // onChange={handleInputChange}
                      variant="filled"
                      defaultValue={data.rate}
                      required
                    />
                    <TextField
                      name="age"
                      label="age"
                      type="text"
                      // onChange={handleInputChange}
                      defaultValue={data.age}
                      variant="filled"
                      fullWidth
                      required
                    />
                    <TextField
                      label="Responsibilities"
                      // name="responsibilities"
                      variant="filled"
                      multiline
                      rows={4}
                      // onChange={handleInputChange}
                      fullWidth
                      defaultValue={data.responsibilities}
                    />
                    <TextField
                      name="about"
                      label="Little bit about you"
                      type="text"
                      multiline
                      rows={4}
                      fullWidth
                      // onChange={handleInputChange}
                      defaultValue={data.about}
                      variant="filled"
                      required
                    />
                    <Button
                      sx={{ mt: 1 }}
                      fullWidth
                      variant="contained"
                      type="submit"
                      // onClick={update}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        );
      })}
    </Box>
  );
};

export default EditProfile;
