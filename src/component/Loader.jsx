import React from "react";
import { ScaleLoader } from "react-spinners";
function Loader() {
  return (
    <div className="loader_container">
      <div className="loader_row">
        <ScaleLoader
          className="loader"
          size={120}
          color="#ff4a57"
          loading={"loading"}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export default Loader;
