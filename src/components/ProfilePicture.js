import React from "react";
import firebase from "firebase/compat/app";
import { upload } from "../firebase";
import "firebase/compat/auth";
import { useEffect, useState } from "react";
import { Input, Button, Box, Alert } from "@mui/material";
import "./style/ProfilePicture.css";
export default function ProfilePicture() {
  const currentUser = firebase.auth().currentUser;
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://www.creativefabrica.com/wp-content/uploads/2021/01/15/Family-Icon-Family-Face-Graphics-7798803-1-1-580x387.jpg"
  );

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const showUploadButton = () => {
    setShowButton(true);
  };

  const uploadPic = () => {
    if (!photo) {
      setError("No file choosen!");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      upload(photo, currentUser, setLoading);
      setShowButton(false);
    }
  };

  useEffect(() => {
    if (currentUser && currentUser.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box>
        <img src={photoURL} alt="Avatar" className="profile_avatar" />
      </Box>
      <Box sx={{ marginTop: 1 }}>
        {error && (
          <Alert
            sx={{ color: "red", backgroundColor: "#ebebeb" }}
            severity="error"
          >
            {error}
          </Alert>
        )}
        {showButton ? <Input type="file" onChange={handleChange} /> : null}

        {!showButton ? (
          <Button variant="outlined" color="success" onClick={showUploadButton}>
            Upload Image
          </Button>
        ) : (
          <Button variant="outlined" color="success" onClick={uploadPic}>
            UPLOAD
          </Button>
        )}
      </Box>
    </Box>
  );
}
