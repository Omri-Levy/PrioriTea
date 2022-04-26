import React from "react";
import spinner from "./loading.svg";

export const Loading = () => {
  return (
      <div className="spinner-container">
        <img src={spinner} className="spinner" alt="spinner" />
      </div>
  );
};
