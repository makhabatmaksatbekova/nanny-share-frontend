import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import NewProfile from "./NewProfile";
import Header from "./Header";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, doc, getDocs, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Box, Button } from "@mui/material";
import "./style/ListAllFamilies.css";

const ListAllFamilies = () => {
  // state
  const currentUser = firebase.auth().currentUser;
  const [families, setFamilies] = useState([]);
  const familiesCollectionRef = collection(db, "families");

  // CRUD operations async function, API retuns promise
  // Gettign all families
  useEffect(() => {
    const getFamilies = async () => {
      const data = await getDocs(familiesCollectionRef);
      setFamilies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getFamilies();
  }, []);

  console.log("families", families);
  console.log(firebase.auth().currentUser.photoURL);

  return (
    <Box minHeight="100vh">
      <Header />

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
                  <Card sx={{ maxWidth: 250 }} className="family_container">
                    <CardActionArea>
                      <CardContent>
                        <Box maxWidth="150px">
                          <CardMedia
                            className="family_img"
                            component="img"
                            src={firebase.auth().currentUser.photoURL}
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
                            {family.Location}
                          </Typography>

                          <Typography
                            variant="span"
                            className="list_all_family_age_rate"
                            color="#1c2843"
                          >
                            {family.age} y | ${family.rate}
                          </Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
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
  );
};

export default ListAllFamilies;
