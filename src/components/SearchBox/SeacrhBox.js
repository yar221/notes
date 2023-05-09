import React, { useContext } from "react";
import "./searchBar.scss";
import { Search } from "react-bootstrap-icons";
import Context from "../../context/context";

const SeacrhBox = () => {
  const { searchedText, setSearchedText, setIsBurgerDown } = useContext(Context);

  return (
    <div className="search-bar">
      <div className="search-bar__image">
        <Search />
      </div>
      <input
        value={searchedText}
        onChange={(e) => {
          setSearchedText(e.target.value);
          if (window.innerWidth <= 596) {
            setIsBurgerDown(true);
          }
        }}
        type="text"
        className="search-bar__input"
        placeholder="Serch..."
      />
    </div>
  );
};

export default SeacrhBox;
