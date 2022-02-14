import React, { useEffect } from "react";
import useCreateProfile from "./FamilyProfileHooks";
import { Link } from "react-router-dom";
import "./style/Popup.css";

const Popup = ({ id, buttonPopup }) => {
  const { deleteFamilyProfile } = useCreateProfile();

  return buttonPopup ? (
    <div className="popup">
      <div className="popup-inner">
        <h3>Sure you want to delete your profile ?</h3>
        <Link to="/families">
          <button
            onClick={() => {
              deleteFamilyProfile(id);
            }}
          >
            Yes
          </button>
        </Link>

        <Link to="/families/my_profile">
          <button>No</button>
        </Link>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
