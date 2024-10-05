import React from "react";
import { Audio } from "react-loader-spinner";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <Audio
        height="80"
        width="80"
        radius="9"
        color="blue"
        ariaLabel="loading"
      />
    </div>
  );
};

export default Loader;
