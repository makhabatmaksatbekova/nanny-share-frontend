import React from "react";
import Content from "./components/Content";
import Container from "@mui/material/Container";
import Header from "./components/Header";
import "./components/style/App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { Typography, Box } from "@mui/material";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import UpdateProfile from "./components/UpdateProfile";
import ListAllFamilies from "./components/ListAllFamilies";
import NewProfile from "./components/NewProfile";
import MyProfile from "./components/MyProfile";
import EditProfile from "./components/EditProfile";
import Contact from "./components/Contact";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import ShowSingleProfile from "./components/ShowSingleProfile";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  addDoc,
  query,
  where,
} from "firebase/firestore";

const theme = createTheme({
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

function App() {
  const [families, setFamilies] = useState([]);
  const [familiesCopy, setFamiliesCopy] = useState([]);
  const [singleFamily, setSingleFamily] = useState([]);
  const [serchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(false);
  const familiesCollectionRef = collection(db, "families");

  useEffect(() => {
    const getFamilies = async () => {
      const data = await getDocs(familiesCollectionRef);
      setFamilies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getFamilies();
  }, []);

  // Creating family profile
  const handleFamilyProfile = (id) => {
    const singleFam = families.filter((family) => {
      return family.id === id;
    });
    setSingleFamily(singleFam);
  };

  // filter data by zip_code
  const searchByZipcode = (zipCode) => {
    const updated = families.filter((doc) => {
      return doc.zip_code === zipCode;
    });
    setFamiliesCopy(families);
    setFamilies(updated);
    setSearchInput("");
    setSearchResult(true);
  };

  // Trigger like
  const handleLike = async (id, liked) => {
    const filtered = families.map((singleFamily) => {
      if (singleFamily.id === id) {
        singleFamily.liked = !singleFamily.liked;
      }
      return singleFamily;
    });
    setFamilies(filtered);
    const userDoc = doc(db, "families", id);
    const updatedField = { liked: !liked };
    await updateDoc(userDoc, updatedField);
  };

  const handleReset = () => {
    setFamilies(familiesCopy);
    setSearchResult(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/update-profile"
              element={
                <PrivateRoute>
                  <UpdateProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Box
                    sx={{
                      minHeight: "100vh",
                      background:
                        "linear-gradient(rgba(196, 102, 0, 0.6), rgba(155, 89, 182, 0.6))",
                    }}
                  >
                    <Header />

                    <Container maxWidth="lg" className="container">
                      <Content />
                    </Container>
                  </Box>
                </PrivateRoute>
              }
            />
            <Route
              path="/families"
              element={
                <ListAllFamilies
                  families={families}
                  serchInput={serchInput}
                  searchResult={searchResult}
                  handleReset={handleReset}
                  handleFamilyProfile={handleFamilyProfile}
                  searchByZipcode={searchByZipcode}
                />
              }
            />
            <Route path="/families/my_profile" element={<MyProfile />} />
            <Route path="/families/new_profile" element={<NewProfile />} />
            <Route
              path="/families/single_profile"
              element={
                <ShowSingleProfile
                  singleFamily={singleFamily}
                  handleLike={handleLike}
                />
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/families/my_profile/update/:id"
              element={<EditProfile />}
            />
            <Route
              path="/families/single_profile/contact"
              element={<Contact />}
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
