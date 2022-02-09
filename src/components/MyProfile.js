import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import useCreateProfile from "./FamilyProfileHooks";
import ProfilePicture from "./ProfilePicture";
import Header from "./Header";
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
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";

const MyProfile = () => {
  const {
    handleProfileSubmit,
    handleInputChange,
    updateFamilyProfile,
    inputs,
  } = useCreateProfile();

  return (
    <Box minHeight="100vh">
      <Header />
      <Grid
        maxWidth="lg"
        container
        sx={{
          mt: 2,
        }}
      >
        <Box>
          <ProfilePicture />
        </Box>
        <Box>
          <Card sx={{ maxWidth: 550 }}>
            <CardContent>
              <Grid container direction="column" alignItems="center">
                <Grid item sx={{ mb: 2 }}>
                  <Typography variant="h4" component="div">
                    My profile
                  </Typography>
                </Grid>
              </Grid>

              <Box component="form" onSubmit={handleProfileSubmit}>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  spacing={{ xs: 1, sm: 2, md: 2 }}
                >
                  <Grid xs={8} item>
                    <TextField
                      name="familyName"
                      label="Family name"
                      onChange={handleInputChange}
                      value={inputs.familyName}
                      variant="outlined"
                      fullWidth
                      required
                    />
                    <TextField
                      name="location"
                      label="Location"
                      onChange={handleInputChange}
                      value={inputs.location}
                      fullWidth
                      required
                      variant="outlined"
                    />
                    <TextField
                      name="email"
                      label="Email Address"
                      type="email"
                      onChange={handleInputChange}
                      value={inputs.email}
                      required
                      variant="outlined"
                      fullWidth
                    />
                    <TextField
                      name="rate"
                      label="rate"
                      fullWidth
                      onChange={handleInputChange}
                      variant="outlined"
                      value={inputs.rate}
                      required
                    />
                    <TextField
                      name="age"
                      label="age"
                      type="number"
                      onChange={handleInputChange}
                      value={inputs.age}
                      variant="outlined"
                      fullWidth
                      required
                    />
                    <TextField
                      label="Responsibilities"
                      multiline
                      name="responsibilities"
                      variant="outlined"
                      onChange={handleInputChange}
                      fullWidth
                      value={inputs.responsibilities}
                    />
                    <TextField
                      name="about"
                      label="Little bit about you"
                      type="text"
                      rows={4}
                      fullWidth
                      onChange={handleInputChange}
                      value={inputs.about}
                      variant="outlined"
                      required
                    />

                    <Button
                      sx={{ mt: 1 }}
                      variant="contained"
                      type="submit"
                      // color="secondary"
                      onClick={updateFamilyProfile}
                      startIcon={<EditIcon />}
                    >
                      {" "}
                      Edit
                    </Button>
                    <Button
                      sx={{ mt: 1, ml: 1 }}
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      type="submit"
                      color="error"
                    >
                      DELETE
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Box>
  );
};

export default MyProfile;
