import axios from "axios";

axios.defaults.baseURL = process.env.BACK_URL;

export function getVideogames() {
  return function (dispatch) {
    axios.get("/videogames").then((response) => {
      return dispatch({
        type: "GET_GAMES",
        payload: response.data,
      });
    });
  };
}
// export function getVideogames() {
//   return async function (dispatch) {
//     const response = await axios.get("/videogames");
//     let json = response.data;
//     dispatch({ type: "GET_GAMES", payload: json });
//   };
// }
export function getGenres() {
  return async function (dispatch) {
    let json = await axios.get("/genres", {});
    dispatch({ type: "GET_GENRES", payload: json.data });
  };
}
export function getQVideogames(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        `/videogames?name=${name}`
      );
      return dispatch({
        type: "GET_QUERY",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getDetails(id) {
  return async function (dispatch) {
    var json = await axios.get("/videogames/" + id);
    dispatch({
      type: "GET_DETAIL",
      payload: json.data,
    });
  };
}
export let createGame = (payload) => {
  console.log("Soy un peiloud", payload);
  return async (dispatch) => {
    try {
      let json = await axios.post("/videogames", payload);
      return dispatch({
        type: "POST_GAME",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export function orderByName(payload) {
  return async (dispatch) => {
    try {
      dispatch({
        type: "SORT_NAME",
        payload,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
export function showCreated(payload) {
  return async (dispatch) => {
    try {
      dispatch({
        type: "FILTER_SOURCE",
        payload,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
export function filterByGenre(payload) {
  return async (dispatch) => {
    try {
      dispatch({
        type: "FILTER_GENRES",
        payload,
      });
    } catch (err) {
      return console.log(err);
    }
  };
}
export function orderByRating(payload) {
  return async (dispatch) => {
    try {
      dispatch({
        type: "SORT_RATING",
        payload,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function deleteById(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        `/videogames/${id}/delete`
      );
      return dispatch({ type: "DELETE_BY_ID", payload: json.data });
    } catch (err) {
      console.log(err);
    }
  };
}
export function clear() {
  return {
    type: "CLEAR",
  };
}
