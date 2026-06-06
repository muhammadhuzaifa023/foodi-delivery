import React from "react";
import Images from "./Images";
import Text from "./Text";

const Banner = () => {
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="py-24 flex flex-col md:flex-row-reverse justify-between items-center gap-8">
        {/* images */}
        <Images />

        {/* texts */}
        <Text />
      </div>
    </div>
  );
};

export default Banner;
