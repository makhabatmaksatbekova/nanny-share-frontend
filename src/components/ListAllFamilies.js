import React from "react";
import "firebase/compat/auth";
import Header from "./Header";
import { useState } from "react";
import { Link } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { TextField, Grid, Box, Button, Alert } from "@mui/material";
import "./style/ListAllFamilies.css";
import "./style/ContainerBg.css";
import useCreateProfile from "./FamilyProfileHooks";

const ListAllFamilies = ({
  families,
  searchResult,
  handleFamilyProfile,
  searchByZipcode,
  handleReset,
}) => {
  const [toggle, setToggle] = useState(false);
  const [zipCode, setZipCode] = useState("");
  const [inputValue, setInputValue] = useState("");
  const { profileCreated } = useCreateProfile();

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
    <Grid minHeight="100vh" className="list_families_container">
      <Box sx={{ borderBottom: "1px solid #1c2843", backgroundColor: "red" }}>
        <Header />
      </Box>
      <Box>
        <Typography sx={{ margin: "20px" }} variant="h5" align="center">
          {" "}
          Families ready for nanny share{" "}
        </Typography>
      </Box>

      <Box maxWidth="lg">
        <Box
          sx={{
            margin: "30px 0 0 40%",
          }}
        >
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
          {searchResult ? <Button onClick={handleReset}>reset</Button> : null}
        </Box>
        <Box>
          {searchResult ? (
            <Typography sx={{ margin: "20px" }} variant="h5" align="center">
              Search results for {zipCode}
            </Typography>
          ) : null}
        </Box>
        <Grid container direction="row" justifyContent="center" sx={{ mt: 2 }}>
          <Grid item xs={12} sm={9}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={{ xs: 1 }}
            >
              {!families.length && (
                <Alert severity="info">No families to show</Alert>
              )}
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
                                <Box
                                  component="span"
                                  sx={{ marginBottom: "5px" }}
                                >
                                  {" "}
                                  {family.city}
                                </Box>
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
              {profileCreated ? null : (
                <Button variant="outlined">Create profile</Button>
              )}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default ListAllFamilies;
