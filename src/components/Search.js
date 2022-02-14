import React, { useState } from "react";
import useCreateProfile from "./FamilyProfileHooks";

const Search = () => {
  const { searchByZipcode } = useCreateProfile();

  const [zipCode, setZipCode] = useState("");

  const handleSearchChange = (e) => {
    setZipCode(e.target.value);
  };
  console.log("test");
  // const onTrigger = (zipCode) => {
  //   searchByZipcode(zipCode);
  // };

  return (
    <div>
      <input
        name="zip_code"
        label=" search family by zip_code"
        onChange={handleSearchChange}
      />
      <button
        onClick={() => {
          searchByZipcode(zipCode);
        }}
      >
        search
      </button>
    </div>
  );
};

export default Search;
