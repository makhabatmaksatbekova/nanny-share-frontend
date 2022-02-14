import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { db } from "../firebase";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const useCreateProfile = () => {
  const uid = firebase.auth().currentUser.uid;
  const photoURL = firebase.auth().currentUser.photoURL;
  const email = firebase.auth().currentUser.email;
  const familiesCollectionRef = collection(db, "families");
  const [inputs, setInputs] = useState({});
  const [docId, setId] = useState("");
  const history = useNavigate();
  const [families, setFamilies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [delProf, setDeleteMes] = useState(false);

  useEffect(() => {
    const getFamilies = async () => {
      const data = await getDocs(familiesCollectionRef);
      setFamilies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getFamilies();
  }, []);

  const searchByZipcode = (zipCode) => {
    const filtered = families.filter((doc) => {
      return doc.zip_code === zipCode;
    });
    setFiltered(filtered);
  };
  console.log("filtered", families);

  // Creating family profile
  const handleProfileSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    history("/families");
    const docRef = await addDoc(familiesCollectionRef, inputs);
  };

  // Updating Family profile // provide docRef id of the current user
  const updateFamilyProfile = (id, data) => {
    const userDoc = doc(db, "families", id);
    // await updateDoc(userDoc, inputs);
  };

  // Delete user
  const deleteFamilyProfile = async (id) => {
    const userDoc = doc(db, "families", id);
    await deleteDoc(userDoc);
    setDeleteMes(true);
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
      uid: uid,
      photoURL: photoURL,
      email: email,
    }));
  };

  return {
    handleProfileSubmit,
    handleInputChange,
    updateFamilyProfile,
    deleteFamilyProfile,
    searchByZipcode,
    inputs,
    families,
    delProf,
  };
};
export default useCreateProfile;
