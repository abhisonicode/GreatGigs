import React, { useContext, useState } from "react";
import ThemeContext from "../../context/themeContext";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const { setSearchFocus } = useContext(ThemeContext);
  const [searchText, setSearchText] = useState();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchText) {
      navigate("/gigs?search=" + searchText);
    }
  };

  return (
    <div className="flex items-stretch justify-stretch w-full lg:w-[700px]">
      <input
        type="text"
        placeholder="What service are you looking?"
        className="px-4 py-2 w-full border rounded focus:outline-none"
        onFocus={() => setSearchFocus(true)}
        onChange={(e) => setSearchText(e.target.value)}
        onBlur={() => setSearchFocus(false)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      ></input>
      <button
        onClick={handleSearch}
        className="p-2 bg-black w-12 flex justify-center -ml-4 rounded-r-md "
      >
        <img
          width="24"
          height="24"
          src="https://img.icons8.com/glyph-neue/ffffff/64/search--v1.png"
          alt="search--v1"
        />
      </button>
    </div>
  );
};

export default SearchForm;
