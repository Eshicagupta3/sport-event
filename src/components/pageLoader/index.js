import React from "react";
import "./style.css";

const PageLoader = () => {
  return (
    <div data-testid="page-loader" className="page-loader">
      <span className="spinner" />
    </div>
  );
};

export default PageLoader;
