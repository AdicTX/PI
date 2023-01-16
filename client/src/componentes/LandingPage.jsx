import React from "react";
import  styles  from "./LandingPage.module.css";
import logo from "../img/logo.png";
import Footer from "./Footer";


import { Link } from "react-router-dom";


const LandingPage = () => {
  
  
  
  return (
    <div className={styles.background_div}>
        <div>
         <div className={styles.header}>
            <input type="image" src={logo} alt=''/> <Footer/>
        </div>
        
        </div>
        <div className={styles.inicio}>
            <h1 className={styles.h1}>Welcome!</h1>
            <p className={styles.texto_inicio}>
                 Individual Proyect design for Henry
                <br />
                by Federico Aldama
                
                
            </p>
            <Link to={"/home"}><input type="button" value="Explore More" className={styles.boton_inicio} /></Link>
        </div>
        
    </div>
    
  );
};
export default LandingPage;


