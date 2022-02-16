import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { db } from "../firebase";
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const useCreateProfile = () => {
  const uid = firebase.auth().currentUser.uid;
  const photoURL = firebase.auth().currentUser.photoURL;
  const email = firebase.auth().currentUser.email;
  const familiesCollectionRef = collection(db, "families");
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const [profileCreated, setProfileCreated] = useState(false);
  const [families, setFamilies] = useState([]);

  useEffect(() => {
    const getFamilies = async () => {
      const data = await getDocs(familiesCollectionRef);
      setFamilies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getFamilies();
  }, []);

  // Creating family profile
  const handleProfileSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    history("/families");
    const docRef = await addDoc(familiesCollectionRef, inputs);
    setProfileCreated(true);
  };

  // Delete user
  const deleteFamilyProfile = async (id) => {
    const userDoc = doc(db, "families", id);
    await deleteDoc(userDoc);
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
      uid: uid,
      photoURL: photoURL,
      email: email,
      liked: false,
    }));
  };

  return {
    handleProfileSubmit,
    handleInputChange,
    deleteFamilyProfile,
    inputs,
    families,
    profileCreated,
  };
};
export default useCreateProfile;
