import React from "react";
import { Link } from "react-router-dom";
import logo from "../../Logonetflix.png";
import { ImSearch } from "react-icons/im";
import "../../App.scss";

const Header = () => {
  return (
    <nav className="header">
      <img src={logo} alt="" />
      <div>
        <Link to="/tvshows">TV Shows</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/recent">Recently Added</Link>
        <Link to="/mylist">My List</Link>
      </div>
      <ImSearch />
    </nav>
  );
};

export default Header;
