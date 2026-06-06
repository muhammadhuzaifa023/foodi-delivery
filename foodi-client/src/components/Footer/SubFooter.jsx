import React from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const SubFooter = () => {
  return (
    <footer className="footer items-center xl:px-24 px-4 py-4 mt-2">
      <aside className="items-center grid-flow-col">
        <p>Copyright © 2023 - All right reserved</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <Link to="https://bilal-dev.vercel.app" target="_blank" className="text-xl font-extrabold flex items-center gap-3">
          Visit Developer Portfolio
          <div className="text-3xl text-green">
            <FaArrowAltCircleRight />
          </div>
        </Link>
      </nav>
    </footer>
  );
};

export default SubFooter;
