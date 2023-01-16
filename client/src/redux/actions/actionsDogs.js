import axios from "axios";

const url = "http://localhost:3001";

export const getDogs = () => (dispatch) => {
  axios.get(`${url}/dogs`).then((data) => {
    dispatch({
      type: "GET_DOGS",
      payload: data.data,
    });
  });
};

export const getTemperaments = () => (dispatch) => {
  axios.get("http://localhost:3001/temperaments").then((data) => {
    dispatch({
      type: "GET_TEMPERAMENTS",
      payload: data.data,
    });
  });
};

export const postDogs = (dogSeleccionado) => (dispatch) => {
  axios
    .post(`${url}/dogs`, {
      name: dogSeleccionado.name,
      height: dogSeleccionado.height,
      weight: dogSeleccionado.weight,
      life_span: dogSeleccionado.life_span,
      temperament: dogSeleccionado.temperament,
      image: dogSeleccionado.image,
    })
    .then((data) => {
      dispatch({
        type: "POST_DOGS",
        payload: data.data,
      });
    });
};

export const receivePost = (payload) => {
  return {
    type: "RECEIVE_POST",
    payload,
  };
};
