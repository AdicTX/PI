import React, { useEffect, useState } from "react";
import img from '../img/filterBy.svg'
import styles from './FilterDogs.module.css'
import { useSelector, useDispatch } from "react-redux";
import {  getTemperaments, receivePost } from "../redux/actions/actionsDogs";
const FilterDogs = () => {
  const temperaments = useSelector((state) => state.reducerDogs.temperaments);
  const dogs = useSelector((state) => state.reducerDogs.dogs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);
  const [selectedOptions, setSelectedOptions] = useState([]);
 

 

 

  const handleOptionChange = (changeEvent) => {
    setSelectedOptions(
        selectedOptions.includes(changeEvent.target.value) 
            ? selectedOptions.filter(so => so !== changeEvent.target.value)
            : [...selectedOptions, changeEvent.target.value]
    );
    
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedOptions);
    // route = "dogs/filterBy/" + selectedOptions;
    // history.push(`${route}`);
    // window.location.reload(true);
    
  };

  const filteredDogs = dogs.filter(dog =>dog.temperament && dog.temperament.some(temp => selectedOptions.includes(temp)));

  useEffect(() => {
    dispatch(receivePost(filteredDogs));
  }, [dispatch, filteredDogs]);
 
  return (
    <div>
      <br></br>
      
      
      
      <form onSubmit={handleSubmit}>
      <div className={styles.container_Check}>
        <div className={styles.imgCont}>
            <img src={img} alt="asd" />
        <h1 className={styles.h1}>Filter By Temperaments</h1>
        </div>
        <div className={styles.container_Check3}>        
          <div className={styles.container_Check2}>
            {temperaments ? temperaments.map(option => (
              <li className={styles.li}  key={option.id}>
                <input
                  type="checkbox"
                  value={option.name}
                  checked={selectedOptions.includes(option.name)}
                  onChange={handleOptionChange}
                  className={styles.check}
                />
                {option.name}
                
              </li>
            )) : <h4>no tiene</h4>}
              </div>
       </div>
      </div>
      </form>
    
      <br />
      <br />
    </div>
  );
};
export default FilterDogs;
