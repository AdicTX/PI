// import React, {useEffect, useState}  from 'react';
// import { useHistory } from "react-router-dom";

// import { useSelector, useDispatch } from "react-redux";
// import {  getDogs } from "../redux/actions/actionsDogs";
// function OrderDogs() {

//     //  const [sortedData, setSortedData] = useState([]);
//     const dogs = useSelector((state) => state.reducerDogs.dogs);
//     let history = useHistory();
//    var route;
//     // const sortedDogs = useSelector((state) => state.reducerDogs.sortedDogs);
    
//     const dispatch = useDispatch();
//     useEffect(() => {
//         dispatch(getDogs());
//     }, [dispatch]);
//     // useEffect(() => {
//     //     dispatch(receivePost(sortedData));
//     // }, [dispatch]);
     


//   const handleSortAZ = () => {
//     route = "/dogs/orderByAZ";
//     history.push(`${route}`);
//     window.location.reload(true);
//   };
//   const handleSortZA = () => {
//     route = "/dogs/filterByZA";
//     history.push(`${route}`);
//     window.location.reload(true);
//   };


//   return (
//     <div> 
//         <h1>Order By</h1>
//         <div>
//         <button onClick={handleSortAZ}>Sort by name A-Z</button>
        
        
//         </div>
//             <div>
//             <button onClick={handleSortZA}>Sort by name Z-A</button>
            
            
//         </div>
//         <div>
//       {/* <button onClick={handleSortWeightAsc}>Sort by weightAsc</button> */}
      
//     </div>
//     <div>
//       {/* <button onClick={handleSortWeightDes}>Sort by weightDes</button> */}
//       <ul>
//         {sortedData.map((item) => (
//           <li key={item.id}>
//             {item.name} - {item.weight}kg
//           </li>
//         ))}
//       </ul>
//     </div>
    
//   </div>
//   );
// }
// export default OrderDogs;