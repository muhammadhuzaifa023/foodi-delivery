import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchIcon = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/menu?search=${searchTerm}`);
      setShowSearch(false);
      setSearchTerm("");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowSearch(!showSearch)}
        className="btn btn-ghost btn-circle lg:flex hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      {/* Search Input Dropdown */}
      {showSearch && (
        <div className="absolute right-0 top-12 z-[100] bg-white p-2 rounded-lg shadow-lg border border-gray-200 w-64">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              autoFocus
              type="text"
              placeholder="Search food..."
              className="input input-bordered input-sm w-full focus:outline-none focus:border-green"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-sm bg-green text-white hover:bg-green">
              Go
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SearchIcon;
