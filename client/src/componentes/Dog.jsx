import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import styles from "./Dog.module.css";


const Dog = () => {
  let { id } = useParams();
  var url = "http://localhost:3001";
  useEffect(() => {
    axios.get(`${url}/dogs/${id}`).then((data) => setData(data.data));
  }, [url,id]);
  
  const [data, setData] = useState([]);
  
  
  return (
    <div className={styles.createDiv}>
    <div className={styles.containerE}>
        <div className={styles.divBreedE}>
          
            <div className={styles.container_img}>
              <img src={data.image} alt="Aqui va la imagen"  className={styles.img}/>
            </div>
            
        <div className={styles.container_data}>
        <div className={styles.TitleBreedE}>
            <p className={styles.card_title}>{data.name}</p>
            </div>
                <div className={styles.date}>
                  <p>Height: {data.height} cm.</p>
                  <p>Weight: {data.weight} kg.</p>
                  <p>life Span: {data.life_span ? data.life_span : `It doesn't have Life Span`}.</p>
                </div>
          <p className={styles.temlabel}>Temperaments</p>
          <div className={styles.temp}>{data.temperament ? data.temperament.map(e => <label className={styles.label} key={e}>{e}</label>) : <h2>Doesn't have any temperaments</h2>
            }
        </div>
          
                   
        </div>
      
      
           
            </div>
            </div>
            </div>
            
  );
};
export default Dog;
