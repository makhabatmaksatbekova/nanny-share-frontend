import { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { db } from "../firebase";
import { collection, doc, addDoc, updateDoc } from "firebase/firestore";

const useCreateProfile = () => {
  const uid = firebase.auth().currentUser.uid;
  console.log("uid", uid);
  const familiesCollectionRef = collection(db, "families");
  const [inputs, setInputs] = useState({});

  // Creating family profile
  const handleProfileSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    await addDoc(familiesCollectionRef, inputs);
  };

  // Updating Family profile
  const updateFamilyProfile = async (event, id) => {
    console.log(id, "id");
    const familyDoc = doc(db, "families", id);

    if (event) {
      event.preventDefault();
    }
    await updateDoc(familyDoc, inputs);
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
      uid: uid,
    }));
  };

  return {
    handleProfileSubmit,
    handleInputChange,
    updateFamilyProfile,
    inputs,
  };
};
export default useCreateProfile;
