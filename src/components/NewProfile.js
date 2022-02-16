import React from "react";

import useCreateProfile from "./FamilyProfileHooks";
import ProfilePicture from "./ProfilePicture";
import Header from "./Header";
import "./style/NewProfile.css";
import { Grid, TextField, Button, Typography, Box } from "@mui/material/";

const NewProfile = () => {
  const { handleProfileSubmit, handleInputChange, inputs } = useCreateProfile();

  return (
    <Box minHeight="100vh">
      <Header />
      <Grid
        maxWidth="lg"
        container
        direction="row"
        justifyContent="center"
        sx={{
          mt: 2,
        }}
      >
        <Grid item xs={12} md={6} sx={{ mt: 2 }}>
          <Grid sx={{ mt: 5 }}>
            <ProfilePicture />
          </Grid>
        </Grid>

        <Grid
          item
          sx={{
            maxWidth: 600,
            boxShadow: "0px 0px 7px #1c2843 ",
            padding: "30px",

            background: "white",
          }}
        >
          <Box component="form" onSubmit={handleProfileSubmit}>
            <Grid
              container
              direction="column"
              alignItems="center"
              sx={{
                background: "white",
              }}
            >
              <Grid item sx={{ mb: 2 }}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    background: "white",
                  }}
                >
                  Create Profile
                </Typography>
              </Grid>

              <Grid xs={8} item className="form_container">
                <TextField
                  name="familyName"
                  label="Family name"
                  onChange={handleInputChange}
                  value={inputs.familyName}
                  variant="filled"
                  fullWidth
                  required
                />

                <TextField
                  name="city"
                  label="address city"
                  onChange={handleInputChange}
                  value={inputs.city}
                  sx={{ width: "23ch" }}
                  required
                  variant="filled"
                  fullWidth
                />

                <TextField
                  name="state"
                  // select
                  label="state"
                  onChange={handleInputChange}
                  value={inputs.state}
                  fullWidth
                  required
                  sx={{ width: "22ch" }}
                  variant="filled"
                />

                <TextField
                  name="zip_code"
                  label="zip_code"
                  required
                  onChange={handleInputChange}
                  value={inputs.zip_code}
                  fullWidth
                  variant="filled"
                  sx={{ width: "22ch" }}
                />
                <TextField
                  name="rate"
                  label="rate"
                  fullWidth
                  onChange={handleInputChange}
                  variant="filled"
                  value={inputs.rate}
                  required
                />
                <TextField
                  name="age"
                  label="child age"
                  type="text"
                  onChange={handleInputChange}
                  value={inputs.age}
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
                  onChange={handleInputChange}
                  fullWidth
                  value={inputs.responsibilities}
                />
                <TextField
                  name="about"
                  label="Little bit about me"
                  type="text"
                  fullWidth
                  multiline
                  rows={4}
                  onChange={handleInputChange}
                  value={inputs.about}
                  variant="filled"
                  required
                />
                <Button
                  sx={{ mt: 1 }}
                  fullWidth
                  variant="contained"
                  type="submit"
                >
                  CREATE
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewProfile;
