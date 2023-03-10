import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  getDogs,
  postDogs, 
  getTemperaments 
} from "../redux/actions/actionsDogs";
import { useSelector, useDispatch } from "react-redux";
import styles from './CreateDog.module.css'
import successImg from '../img/success.svg'
import dogsImg from '../img/dogs.png'




const CreateDog = () => {
  
  const temperaments = useSelector((state) => state.reducerDogs.temperaments);
  const dogs = useSelector((state) => state.reducerDogs.dogs);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [imageDog, setImageDog] = useState(null);
  const [hmin, setHmin] = useState(0);
  const [hmax, setHmax] = useState(0);
  const [wmin, setWmin] = useState(0);
  const [wmax, setWmax] = useState(0);
  const [smin, setSmin] = useState(0);
  const [smax, setSmax] = useState(0);
  const [success, setSuccess] = useState(false);
  const [DogsSeleccionado, setDogsSeleccionado] = useState({
    name: '',
    height: `${hmin} - ${hmax}`,
    weight:  `${wmin} - ${wmax}`,
    life_span:  `${smin} - ${smax}`,    
    temperament: [],
    image: ''
  });
  console.log("🚀 ~ file: CreateDog.jsx:36 ~ CreateDog ~ DogsSeleccionado", DogsSeleccionado)
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    var { name, value } = e.target;
   
    if (name === "image") {
      setImageDog(e.target.files[0]);
      
    }
    
    setDogsSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
      temperament: selectedOptions,
      height: `${hmin} - ${hmax}`,
      weight:  `${wmin} - ${wmax}`,
      life_span:  `${smin} - ${smax}`,
    }));
      
  };

  

  const handleOptionChange = (changeEvent) => {
    setSelectedOptions(
        selectedOptions.includes(changeEvent.target.value) 
            ? selectedOptions.filter(so => so !== changeEvent.target.value)
            : [...selectedOptions, changeEvent.target.value]
    );
    setDogsSeleccionado((prevState) => ({
      ...prevState,      
      temperament: selectedOptions,
      height: `${hmin} - ${hmax}`,
      weight:  `${wmin} - ${wmax}`,
      life_span:  `${smin} - ${smax}`,
    }));
  };

  const dogIsNotSame = dogs.filter(e => e.name === DogsSeleccionado.name )

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedOptions);
    const pattern = /^[a-zA-Z\s]+$/;
    let formErrors = {};
    if (dogIsNotSame.length !== 0) {
      formErrors.name = "Name already exist";
    }
    if (!pattern.test(DogsSeleccionado.name)) {
      formErrors.name = "Name should only have letters";
    }
    if (!DogsSeleccionado.name) {
      formErrors.name = "Name is required";
    }
    if (hmin === 0 || hmax === 0) {
      formErrors.height = "height is required";
    } else if (isNaN(hmin && hmax)) {
      formErrors.height = "height is invalid";
    }
      else if (hmin > hmax) {
        formErrors.height = "max should be greater";
      }
      else if (hmin > 99 || hmax > 99 || hmin < 0 || hmax < 0) {
        formErrors.height = "Number should be between 0 and 99";
      }
    if (wmin === 0 || wmax === 0) {
      formErrors.weight = "weight is required";
    } else if (isNaN(wmin && wmax)) {
      formErrors.weight = "weight is invalid";
    }
    else if (wmin > wmax) {
      formErrors.weight = "max should be greater";
    }
    else if (wmin > 99 || wmax > 99 || wmin < 0 || wmax < 0) {
      formErrors.weight = "Number should be between 0 and 99";
    }
    if (smin === 0 || smax === 0) {
      formErrors.life_span = "life span is required";
    } else if (isNaN(smin && smax)) {
      formErrors.life_span = "life span is invalid";
    }
    else if (smin > smax) {
      formErrors.life_span = "max should be greater";
    }
    else if (smin > 99 || smax > 99 || smin < 0 || smax < 0) {
      formErrors.life_span = "Number should be between 0 and 99";
    }
    if (DogsSeleccionado.temperament.length === 0) {
      formErrors.temperament = "temperament is required";
    }
    if (!DogsSeleccionado.image) {
      formErrors.image = "Image is required";
    }
    setErrors(formErrors);
    console.log(errors);
    if (Object.keys(formErrors).length === 0) {
      setDogsSeleccionado((prevState) => ({
        ...prevState,
        temperament: selectedOptions,
        height: `${hmin} - ${hmax}`,
        weight:  `${wmin} - ${wmax}`,
        life_span:  `${smin} - ${smax}`,
      }));
       imageUpload();
      console.log("dogs", DogsSeleccionado)
      dispatch(postDogs(DogsSeleccionado));
      setSuccess(true)
    }
    
  };

  

  const imageUpload = () => {
    if (imageDog) {
      if (
        imageDog.type === "image/jpeg" ||
        imageDog.type === "image/png"
      ) {
        const formData = new FormData();
        formData.append("myFile", imageDog, imageDog.name);
        axios.post("http://181.127.189.247:3001/vehicles/image", formData);
      } 
    }
  };
  const dispatch = useDispatch();
 

  useEffect(() => {
    if (imageDog) {
      setDogsSeleccionado((prevState) => ({
        ...prevState,
        "image": `http://181.127.189.247:8081/Vehiculos/${imageDog.name}`,
      }));
    }
   
    
  }, [imageDog]);

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);
  

 


      if(success){  
        return (
          <div className={styles.createDiv}>
            <div className={styles.containerE}>
                <div className={styles.divBreedE}>
                  <div className={styles.TitleBreedE}>
                    <div>
                      <img src={successImg} alt="" />
                      <p>Success</p>
                      <div><p className={styles.pE}>Thank you for your submit, reload the page for another submit.</p></div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        ) 
      }
      else{
      return (

     
    <div className={styles.createDiv}>
      <div className={styles.Div}>
       <form onSubmit={handleSubmit}>
      
      
      
        <div className={styles.container}>
          <div className={styles.divBreed}>
           <div className={styles.TitleBreed}>
            <p>Insert Breed</p>
          </div>
        
          <div>
            <p className={styles.form_item}>Name</p>
            <input
              className={styles.form_name}
              type="text"
              name="name"
              value={DogsSeleccionado ? DogsSeleccionado.name : ""}
              onChange={handleChange}
            />{errors.name && <div className={styles.errorDivName}> <p className={styles.error}>{errors.name}</p></div>}
            <br />
            <p className={styles.form_item}>Height</p>
            <div className={styles.divCamp}>
              <p className={styles.min}>Min</p> 
                <input
                
                  className={styles.form_input}
                  type="text"
                  name="height"
                  value={
                    hmin ? hmin : ""
                  }
                  onChange={(e) => {
                          setHmin(e.target.value);
                      }}
                />{errors.height && <div className={styles.errorDiv}> <p className={styles.error}>{errors.height}</p></div>}
              <p className={styles.max}>Max</p>
                <input
                  className={styles.form_input}
                  type="text"
                  name="height"
                  value={
                    hmax ? hmax : ""
                  }
                  onChange={(e) => {
                          setHmax(e.target.value);
                      }}
                />

            </div>

            <br />
            <p className={styles.form_item}>Weight</p>
            <div className={styles.divCamp}>
            <p className={styles.min}>Min</p> 
                <input
                 className={styles.form_input}
                  type="text"
                  name="weight"
                  value={
                    wmin ? wmin : ""
                  }
                  onChange={(e) => {
                          setWmin(e.target.value);
                      }}
                />{errors.weight && <div className={styles.errorDiv}> <p className={styles.error}>{errors.weight}</p> </div>}
              <p className={styles.max}>Max</p>  
                <input
                  className={styles.form_input}
                  type="text"
                  name="weight"
                  value={
                    wmax ? wmax : ""
                  }
                  onChange={(e) => {
                          setWmax(e.target.value);
                      }}
                />
            </div>
            <br />
            <p className={styles.form_item}>Life Span</p>
            <div className={styles.divCamp}>
            <p className={styles.min}>Min</p>  
                <input
                 className={styles.form_input}
                  type="text"
                  name="life_span"
                  value={
                    smin ? smin : ""
                  }
                  onChange={(e) => {
                          setSmin(e.target.value);
                      }}
                />{errors.life_span && <div className={styles.errorDiv}> <p className={styles.error}>{errors.life_span}</p> </div>}
              <p className={styles.max}>Max</p>  
                <input
                  className={styles.form_input}
                  type="text"
                  name="life_span"
                  value={
                    smax ? smax : ""
                  }
                  onChange={(e) => {
                          setSmax(e.target.value);
                      }}
                />
            </div>
            </div>
            </div>
            <div className={styles.divTemp}>          
            <div className={styles.container_Check}>
            <div className={styles.TitleBreed}>
                    <p>Temperaments</p>
                    
                  </div>  
                  {errors.temperament && <div className={styles.errorDivTemp}> <p className={styles.error}>{errors.temperament}</p></div>}
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
                  ))  : ''}
                    </div>
                </div>
                </div>
             </div>
            <div className={styles.divImg}>
            <div className={styles.TitleBreed}>
                    <h3>Image</h3>
                  </div>  
                
                {errors.image && <p className={styles.error}>{errors.image}</p>}
                <div className={styles.img}>
                  <img  src={DogsSeleccionado.image} alt='' />
                </div>
                <input name="image" type="file"  onChange={handleChange} />
                <br /><br></br>
                <img src={dogsImg} alt="" />
                <br />
            </div>       
            
        
            <div>
            <input className={styles.button} type="submit" value="Create" />
            </div>
            </div>
          </form>
      
    </div>
</div>    
  );}
};
export default CreateDog;
