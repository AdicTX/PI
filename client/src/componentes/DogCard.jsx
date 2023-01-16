import React from "react";
import { Link } from "react-router-dom";
import styles from "./DogCard.module.css";
const DogCard = ({ id, name, temperament, height, weight, image }) => {
  
  return (
    <Link to={`/dogs/${id}`}>
      <div className={styles.card}>
        
          <img src={image} alt="Aqui va la imagen" className={styles.card_img} />
        
        <div className={styles.container_card}>
        <label className={styles.card_title}>{name}</label>
          
          <div className={styles.temp}>{temperament ? temperament.map(e => <label className={styles.label} key={e}>{e}</label>) : <label className={styles.label}>Doesn't have any temperaments</label>
            }</div>
         <div className={styles.card_w}>
          <label className={styles.label2}>weight: {height} kg</label>
          {/* <label className={styles.label2}>height: {weight}</label> */}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default DogCard;
