import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import NewProfile from "./NewProfile";
import Header from "./Header";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Box, Button } from "@mui/material";
import "./style/ListAllFamilies.css";
import "./style/ContainerBg.css";
import useCreateProfile from "./FamilyProfileHooks";
import ShowSingleProfile from "./ShowSingleProfile";
import Search from "./Search";

const ListAllFamilies = ({ handleFamilyProfile }) => {
  const [family, setFamily] = useState([]);
  const [toggle, setToggle] = useState(false);
  const { families } = useCreateProfile();

  const onTrigger = (id) => {
    handleFamilyProfile(id);
  };

  return (
    <Box>
      <Header />
      <Search />
      <Grid container direction="row" justifyContent="center" sx={{ mt: 2 }}>
        <Grid item xs={12} sm={9}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={{ xs: 1 }}
          >
            {families.map((family) => {
              return (
                <Grid
                  item
                  xs={10}
                  sm={6}
                  md={4}
                  lg={3}
                  key={family.id}
                  sx={{ maxWidth: 300 }}
                >
                  <Link to="/families/single_profile">
                    <Box
                      sx={{ maxWidth: 250, margin: "10px" }}
                      onClick={() => {
                        onTrigger(family.id);
                      }}
                      className="family_container"
                    >
                      <Box>
                        <Box>
                          <Box maxWidth="150px">
                            <CardMedia
                              className="family_img"
                              component="img"
                              src={family.photoURL}
                              alt="family icon"
                            />
                          </Box>
                          <Box className="card_content">
                            <Typography
                              className="family_name"
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
                              {family.familyName}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                              {family.address}
                            </Typography>

                            <Typography
                              variant="span"
                              className="list_all_family_age_rate"
                              color="#1c2843"
                            >
                              {family.age} | ${family.rate}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={2}>
          {!family.length > 0 && (
            <Link to="/families/new_profile">
              <Button variant="outlined">Create profile</Button>
            </Link>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ListAllFamilies;
