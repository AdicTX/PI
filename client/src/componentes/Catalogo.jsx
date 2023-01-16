import React, { useState, useEffect } from "react";

import "./Catalogo.css";
import DogCard from "./DogCard.jsx";
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from "react-redux";
import {  getDogs } from "../redux/actions/actionsDogs";
import imgOr from '../img/order.svg'
const Catalogo = () => {
  
    const [currentItems, setCurrentItems] = useState();
    const [data, setData] = useState();
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [sortedData, setSortedData] = useState([]);
    const itemsPerPage = 8;
    const dogs = useSelector((state) => state.reducerDogs.dogs);
    const dogsSort = useSelector((state) => state.reducerDogs.sortedDogs);
    

   
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDogs());
}, [dispatch]);

 
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;  
    if(dogsSort && dogsSort.length > 0 ){   
      setData(dogsSort); 
     setCurrentItems(sortedData.length > 0 ? sortedData.slice(itemOffset, endOffset) : dogsSort.slice(itemOffset, endOffset));
     setPageCount(Math.ceil(dogs.length / itemsPerPage))
    }else {
      setData(dogs);
      setCurrentItems(sortedData.length > 0 ? sortedData.slice(itemOffset, endOffset) : dogs.slice(itemOffset, endOffset));
     setPageCount(Math.ceil(dogs.length / itemsPerPage))
    }
    },[itemOffset, itemsPerPage,dogs, sortedData, dogsSort, data]);

 
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % dogs.length;
    setItemOffset(newOffset);
  };

  const handleSortZA = () => {
    
    const dataCopy = [...data];
    dataCopy.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); 
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }

      
      return 0;
    });
    setSortedData(dataCopy);
    
  };

  const handleSortAZ = () => {
    const dataCopy = [...data];
    
    dataCopy.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); 
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      
      return 0;
    });
    setSortedData(dataCopy);
  };
  const sortWeightAsc = () => {
    const dataCopy = [...data];
    dataCopy.sort((a, b) => {
    let weightA = a.weight.split(' - ').map(n => Number(n))
    let weightB = b.weight.split(' - ').map(n => Number(n))
    if(weightA[0] > weightB[0]) return 1
    if(weightA[0] < weightB[0]) return -1
    if(weightA[1] > weightB[1]) return 1
    if(weightA[1] < weightB[1]) return -1
    return 0
  });
  setSortedData(dataCopy);
}
const sortWeightDesc = () =>{
  const dataCopy = [...data];
    dataCopy.sort((a, b) => {
    let weightA = a.weight.split(' - ').map(n => Number(n))
    let weightB = b.weight.split(' - ').map(n => Number(n))
    if(weightA[0] < weightB[0]) return 1
    if(weightA[0] > weightB[0]) return -1
    if(weightA[1] < weightB[1]) return 1
    if(weightA[1] > weightB[1]) return -1
    return 0
    });
    setSortedData(dataCopy);
}
  
  return (
    <div>
      <div className="btnDiv">
      <img src={imgOr} alt="asd" />
          <div className="btnDiv2">             
            <h1 className="Orderby">Order By</h1>
          </div>
          <div className="btnDiv3">
              <input type="submit" className='btnSort' onClick={handleSortAZ} value='Name A-Z' /> 
              <input type="submit" className='btnSort' onClick={handleSortZA} value='Name Z-A' />
              <input type="submit" className='btnSort' onClick={sortWeightAsc} value='Weight Asc' />
              <input type="submit" className='btnSort' onClick={sortWeightDesc} value='Weight Desc' />
            </div>
       </div>
    <div className="container">
      { currentItems ? currentItems.map((t) => (
        <DogCard  key={t.id} id={t.id} name={t.name} temperament={t.temperament} weight={t.weight} height={t.height} image={t.image} />

      )) : <h3>loading</h3>}
      
    </div>
      <div className="DivPagi">
        <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeClassName="active"
          />
      </div>
    </div>
  );
};
export default Catalogo;
