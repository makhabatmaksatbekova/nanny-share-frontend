import React, { useRef, useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import useCreateProfile from "./FamilyProfileHooks";
import ProfilePicture from "./ProfilePicture";
import EditProfile from "./EditProfile";
import Header from "./Header";
import Popup from "./Popup";
import DeletedMessage from "./DeletedMessage";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
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

import { db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  where,
  query,
} from "firebase/firestore";
import AvatarEditor from "react-avatar-editor";

const MyProfile = () => {
  const { deleteFamilyProfile, delProf } = useCreateProfile();
  const currentUser = firebase.auth().currentUser;
  const familiesCollectionRef = collection(db, "families");
  const [family, setFamily] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
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

  const handleClick = () => {
    setButtonPopup(true);
  };

  return (
    <Box className="containerBg" minHeight="100vh">
      <Header />
      <DeletedMessage />

      <Grid sx={{ mt: 10 }} maxWidth="50%">
        {family.map((data) => {
          return (
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ paddingTop: "15px" }}
              key={data.id}
            >
              {" "}
              <Popup id={data.id} buttonPopup={buttonPopup} />
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
                      width: "200px",
                      height: "auto",
                    }}
                    src={data.photoURL}
                  />
                )}
              </Grid>
              <Button sx={{ margin: "20px" }} variant="outlined">
                <Link to={"/families/my_profile/update/" + data.familyName}>
                  {" "}
                  Edit Profile
                </Link>
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
                  {data.age}
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
              <Button
                onClick={handleClick}
                sx={{ margin: "10px", ml: 1 }}
                variant="outlined"
                color="error"
              >
                DELETE Profile
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default MyProfile;
