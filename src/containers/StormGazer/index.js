import { useState } from "react";
import classes from "./StormGazer.module.css";

const StormGazer = (props) => {
  const [zipCode, setZipCode] = useState("");

  const handleVal = (event) => {
    setZipCode(event.target.value);
    console.log(zipCode);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(zipCode);
  };

  return (
    <form onSubmit={submitHandler} className={classes["zip-code"]}>
      <label htmlFor="zipCode">Zip Code</label>
      <input value={zipCode} id="zipCode" onChange={handleVal} />
      <button>Zip Code</button>
    </form>
  );
};

export default StormGazer;
