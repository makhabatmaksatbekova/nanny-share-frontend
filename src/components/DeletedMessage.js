import React, { useEffect } from "react";
import useCreateProfile from "./FamilyProfileHooks";
import { Link } from "react-router-dom";
// import "./style/Popup.css";

const DeletedMessage = () => {
  const { delProf } = useCreateProfile();
  // console.log(delProf);

  return delProf ? (
    <div className="popup">
      <div className="popup-inner">
        {/* <Link to="/families"> */}
        <h3>Your profile was delted</h3>
        {/* </Link> */}

        <button>No</button>
      </div>
    </div>
  ) : (
    ""
  );
};

export default DeletedMessage;
