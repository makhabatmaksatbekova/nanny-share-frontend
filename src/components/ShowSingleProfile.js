import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import Contact from "./Contact";
import {
  Card,
  Grid,
  Container,
  TextField,
  Button,
  Divider,
  Typography,
  Box,
} from "@mui/material/";

const ShowSingleProfile = ({ singleFamily }) => {
  const family = singleFamily;
  console.log(singleFamily, "showsingle");

  return (
    <Box className="containerBg" minHeight="100vh">
      <Header />
      <Grid sx={{ mt: 10 }} maxWidth="50%">
        {family.map((data) => {
          return (
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              key={data.id}
            >
              <Grid
                item
                sx={{
                  marginTop: "10px",
                  position: "relative",
                  display: "inline-block",
                  width: "200px",
                  height: "200px",
                  overflow: "hidden",
                }}
              >
                {data.photoURL && (
                  <img
                    style={{
                      // marginLeft: "-50px",
                      width: "200px",
                      height: "auto",
                    }}
                    src={data.photoURL}
                  />
                )}
              </Grid>
              <Button sx={{ margin: "20px" }} variant="outlined">
                <Link to={"/families/single_profile/contact"}> CONTACT</Link>
              </Button>

              <Grid>
                <Divider>
                  <Typography sx={{ fontSize: "20px", fontWeight: "medium" }}>
                    {data.familyName}
                  </Typography>
                </Divider>
                <Grid container direction="row" alignItems="center">
                  <Grid item>
                    <LocationOnTwoToneIcon fontSize="small" />
                  </Grid>
                  <Grid item sx={{ marginBottom: "2px" }}>
                    <Typography component="h6">{data.address}</Typography>
                  </Grid>
                </Grid>

                <Grid container direction="row" alignItems="center">
                  <Grid item>
                    <AttachMoneyIcon fontSize="small" />
                  </Grid>
                  <Grid item sx={{ marginBottom: "2px" }}>
                    <Typography component="h6">{data.rate}</Typography>
                  </Grid>
                </Grid>

                <Typography
                  component="span"
                  sx={{ color: "black", fontWeight: "bolder" }}
                >
                  Responsibilities:{" "}
                  <Typography component="span">
                    {data.responsibilities}
                  </Typography>
                </Typography>

                <Typography component="h6">
                  <span style={{ color: "black", fontWeight: "bolder" }}>
                    Your baby age:
                  </span>{" "}
                  {data.age} years old
                </Typography>

                <Typography
                  component="span"
                  sx={{ color: "black", fontWeight: "bolder" }}
                >
                  About you:
                  <Typography sx={{ marginLeft: "2px" }} component="span">
                    {data.about}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ShowSingleProfile;
