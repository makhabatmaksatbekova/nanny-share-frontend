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
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { TextField, Grid, Box, Button } from "@mui/material";
import "./style/ListAllFamilies.css";
import "./style/ContainerBg.css";
import useCreateProfile from "./FamilyProfileHooks";
import ShowSingleProfile from "./ShowSingleProfile";
import { NoLuggageOutlined } from "@mui/icons-material";

const ListAllFamilies = ({
  families,
  searchInput,
  handleFamilyProfile,
  searchByZipcode,
}) => {
  const [toggle, setToggle] = useState(false);
  const [zipCode, setZipCode] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
    setZipCode(e.target.value);
  };

  const onTrigger = (id) => {
    handleFamilyProfile(id);
  };

  const handleInputClear = () => {
    searchByZipcode(zipCode);
    setInputValue("");
  };
  return (
    <Box>
      <Box sx={{ borderBottom: "1px solid #1c2843" }}>
        <Header />
      </Box>

      <Box sx={{ margin: "20px 0px 0px 20px" }}>
        <TextField
          value={inputValue}
          className="family_list_searchInput"
          name="zip_code"
          onChange={handleSearchChange}
        />
        <Button
          onClick={() => {
            handleInputClear();
          }}
        >
          search
        </Button>
      </Box>
      <Box>
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
                        {" "}
                        {family.liked ? (
                          <FavoriteIcon className="red" />
                        ) : (
                          <FavoriteBorderIcon className="gray" />
                        )}
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
                                <LocationOnIcon />
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
            <Link to="/families/new_profile">
              <Button variant="outlined">Create profile</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ListAllFamilies;
