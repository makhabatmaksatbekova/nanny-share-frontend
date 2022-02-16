import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import useCreateProfile from "./FamilyProfileHooks";
import ProfilePicture from "./ProfilePicture";
import Header from "./Header";
import "./style/EditProfile.css";
import { Grid, TextField, Button, Typography, Box } from "@mui/material/";
import { db } from "../firebase";
import {
  collection,
  doc,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const EditProfile = () => {
  const [family, setFamily] = useState([]);
  const [updatedInput, setUpdatedInputs] = useState({});

  //query family with given id
  const currentUser = firebase.auth().currentUser;
  const familiesCollectionRef = collection(db, "families");
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

  const handleUpdatedInput = (event) => {
    event.persist();
    setUpdatedInputs((updatedInput) => ({
      [event.target.name]: event.target.value,
    }));
  };

  // Updating family profile
  const updateFamilyProfile = async (event, id) => {
    if (event) {
      event.preventDefault();
    }
    const userDoc = doc(db, "families", id);
    console.log("id", id);
    await updateDoc(userDoc, updatedInput);
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
              <Box
                component="form"
                onSubmit={(e) => {
                  updateFamilyProfile(e, data.id);
                }}
              >
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
                      onChange={handleUpdatedInput}
                      value={updatedInput.familyName}
                      defaultValue={data.familyName}
                      variant="filled"
                      fullWidth
                      required
                    />

                    <TextField
                      name="city"
                      label="city"
                      onChange={handleUpdatedInput}
                      value={updatedInput.city}
                      defaultValue={data.city}
                      sx={{ width: "23ch" }}
                      required
                      variant="filled"
                      fullWidth
                    />

                    <TextField
                      name="state"
                      label="state"
                      onChange={handleUpdatedInput}
                      value={updatedInput.state}
                      defaultValue={data.state}
                      fullWidth
                      required
                      sx={{ width: "22ch" }}
                      variant="filled"
                    />

                    <TextField
                      name="zip_code"
                      label="zip_code"
                      required
                      onChange={handleUpdatedInput}
                      value={updatedInput.zip_code}
                      defaultValue={data.zip_code}
                      fullWidth
                      variant="filled"
                      sx={{ width: "22ch" }}
                    />
                    <TextField
                      name="rate"
                      label="rate"
                      fullWidth
                      onChange={handleUpdatedInput}
                      value={updatedInput.rate}
                      variant="filled"
                      defaultValue={data.rate}
                      required
                    />
                    <TextField
                      name="age"
                      label="age"
                      type="text"
                      onChange={handleUpdatedInput}
                      value={updatedInput.age}
                      defaultValue={data.age}
                      variant="filled"
                      fullWidth
                      required
                    />
                    <TextField
                      label="Responsibilities"
                      name="responsibilities"
                      variant="filled"
                      multiline
                      rows={4}
                      onChange={handleUpdatedInput}
                      value={updatedInput.responsibilities}
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
                      onChange={handleUpdatedInput}
                      value={updatedInput.about}
                      defaultValue={data.about}
                      variant="filled"
                      required
                    />
                    <Button
                      sx={{ mt: 1 }}
                      fullWidth
                      variant="contained"
                      type="submit"
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
