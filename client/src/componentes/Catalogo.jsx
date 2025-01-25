import React, { useState, useEffect } from "react";

import "./Catalogo.css";
import DogCard from "./DogCard.jsx";
// import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from "react-redux";
import { getDogs } from "../redux/actions/actionsDogs";
import imgOr from "../img/order.svg";
import Paginate from "./Paginate";

const Catalogo = () => {
  // const [currentItems, setCurrentItems] = useState();
  // const [pageCount, setPageCount] = useState(0);
  // const [itemOffset, setItemOffset] = useState(0);
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const itemsPerPage = 8;
  const dogs = useSelector((state) => state.reducerDogs.dogs);
  const dogsFilter = useSelector((state) => state.reducerDogs.sortedDogs);
  const searchedDogs = useSelector((state) => state.reducerDogs.searchedDogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage, setCharactersPerPage] = useState(8);
  const [indexOfLastCharacter, setIndexOfLastCharacter] = useState(8);

  const [currentDogs, setCurrentDogs] = useState();

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [dogsFilter]);

  useEffect(() => {
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
    setIndexOfLastCharacter(currentPage * charactersPerPage);
    if (dogsFilter && dogsFilter.length > 0) {
      setCurrentDogs(data && data.slice(indexOfFirstCharacter, indexOfLastCharacter));

      setData(dogsFilter);
      setData2(dogsFilter);
    } else {
      if (searchedDogs && searchedDogs.length > 0) {
        setCurrentDogs(data && data.slice(indexOfFirstCharacter, indexOfLastCharacter));

        setData(searchedDogs);
        setData2(searchedDogs);
      } else {
        setCurrentDogs(data && data.slice(indexOfFirstCharacter, indexOfLastCharacter));

        setData(dogs);
        setData2(dogs);
      }
    }
  }, [
    itemsPerPage,
    dogs,
    dogsFilter,
    data,
    data2,
    searchedDogs,
    charactersPerPage,
    currentPage,
    indexOfLastCharacter,
  ]);

  const handleSortZA = () => {
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;

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
    setCurrentDogs(dataCopy.slice(indexOfFirstCharacter, indexOfLastCharacter));
  };

  const handleSortAZ = () => {
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;

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
    setCurrentDogs(dataCopy.slice(indexOfFirstCharacter, indexOfLastCharacter));
  };
  const sortWeightAsc = () => {
    // .reduce((a, b) => a + b, 0)

    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;

    const dataCopy = [...data];
    dataCopy.sort((a, b) => {
      let weightA = a.weight.split(" - ").map((n) => Number(n));
      let weightB = b.weight.split(" - ").map((n) => Number(n));
      if (weightA[1] > weightB[1]) return 1;
      if (weightA[1] < weightB[1]) return -1;
      if (weightA[0] > weightB[0]) return 1;
      if (weightA[0] < weightB[0]) return -1;
      return 0;
    });
    setCurrentDogs(dataCopy.slice(indexOfFirstCharacter, indexOfLastCharacter));
  };
  const sortWeightDesc = () => {
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;

    const dataCopy = [...data];
    dataCopy.sort((a, b) => {
      let weightA = a.weight.split(" - ").map((n) => Number(n));
      let weightB = b.weight.split(" - ").map((n) => Number(n));
      if (weightA[0] < weightB[0]) return 1;
      if (weightA[0] > weightB[0]) return -1;
      if (weightA[1] < weightB[1]) return 1;
      if (weightA[1] > weightB[1]) return -1;
      return 0;
    });
    setCurrentDogs(dataCopy.slice(indexOfFirstCharacter, indexOfLastCharacter));
  };

  return (
    <div>
      <div className="btnDiv">
        <img src={imgOr} alt="ima" />
        <div className="btnDiv2">
          <h1 className="Orderby">Order By</h1>
        </div>
        <div className="btnDiv3">
          <input type="submit" className="btnSort" onClick={handleSortAZ} value="Name A-Z" />
          <input type="submit" className="btnSort" onClick={handleSortZA} value="Name Z-A" />
          <input type="submit" className="btnSort" onClick={sortWeightAsc} value="Weight Asc" />
          <input type="submit" className="btnSort" onClick={sortWeightDesc} value="Weight Desc" />
        </div>
      </div>

      <div className="container">
        {currentDogs ? (
          currentDogs.map((t) => (
            <DogCard
              key={t.id}
              id={t.id}
              name={t.name}
              temperament={t.temperament}
              weight={t.weight}
              height={t.height}
              image={t.image}
            />
          ))
        ) : (
          <h3>loading</h3>
        )}
      </div>

      <div className="DivPagi">
        <Paginate
          charactersPerPage={charactersPerPage}
          allCharacters={data && data.length}
          paginate={paginate}
        />
        {/* <ReactPaginate
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
          /> */}
      </div>
    </div>
  );
};
export default Catalogo;
