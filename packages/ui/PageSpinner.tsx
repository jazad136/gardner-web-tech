import React from "react";
import Spinner from "./Spinner";

const PageSpinner: React.FC = () => (
  <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-500 opacity-75 flex flex-col items-center justify-center">
    <Spinner />
  </div>
);

export default PageSpinner;
