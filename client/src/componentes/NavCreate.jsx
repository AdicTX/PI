import React from "react";
import Logo from "../img/logo.png";


import { Link } from "react-router-dom";
import styles from "./NavCreate.module.css";
const Nav = () => {
  return (
    <nav className={styles.nav_container}>
      <div className="img-container">
        <div className="nolink">
          <Link to="/home">
            <div className={styles.logo}>
              <img
                id="logo"
                src={Logo}
                
                alt="Logo"
              />
              
            </div>
          </Link>
        </div>
      </div>
      
      <br />
    </nav>
  );
};

export default Nav;
