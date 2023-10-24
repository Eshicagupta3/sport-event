import React from "react";
import "./style.css";

const PageLoader = () => {
  return (
    <div role="alert" aria-busy="true" data-testid="page-loader" className="page-loader">
      <span className="spinner" />
    </div>
  );
};

export default PageLoader;
