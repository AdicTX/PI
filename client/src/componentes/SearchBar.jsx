import React from "react";
import { useHistory } from "react-router-dom";
import styles from './SearchBar.module.css'

const SearchBar = () => {
  let history = useHistory();
  var route;
  const handleChange = (e) => {
    route = "/dogs/search/" + e.target.value;
  };

  const redirect = () => {
    if (!route) return null;
    history.push(`${route}`);
    window.location.reload(true);
  };

  return (
    <form className={styles.d_flex}>
      <input type='submit' onClick={redirect} className={styles.button_search} value=' '  />
      
      <input
        className={styles.searchBar}
        type="text"
        placeholder=" Search..."
        aria-label="Search"
        onChange={handleChange}
      />
      
    </form>
  );
};

export default SearchBar;
