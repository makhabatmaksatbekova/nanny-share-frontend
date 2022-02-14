import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const Contact = () => {
  const currentUser = firebase.auth().currentUser;
  return (
    <div>
      <form
        action="https://formsubmit.co/maksatbekova.m@gmail.com"
        method="POST"
      >
        <input type="text" name="name" placeholder="name" required />
        <input type="email" name="email" defaultValue={currentUser.email} />
        <textarea
          rows="5"
          cols="60"
          placeholder="write your message here"
          required
        />
        <button type="submit">SEND</button>
      </form>
    </div>
  );
};

export default Contact;
