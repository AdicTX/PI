const initialState = {
  dogs: [],
  temperaments: [],
  sortedDogs: [],
  searchedDogs: [],
};

const ReducerDogs = (state = initialState, actions) => {
  switch (actions.type) {
    case "POST_DOGS":
      return {
        dogs: [...state.dogs, actions.payload],
      };

    case "GET_DOGS":
      return {
        ...state,
        dogs: actions.payload,
      };

    case "RECEIVE_POST":
      return {
        ...state,
        sortedDogs: actions.payload,
      };

    case "SEARCH_DOGS":
      return {
        ...state,
        searchedDogs: actions.payload,
      };

    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: actions.payload.sort((a, b) => {
          const nameA = a.name.toUpperCase(); // ignore upper and lowercase
          const nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        }),
      };

    default:
      return state;
  }
};
export default ReducerDogs;
