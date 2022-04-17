import axios from "axios";

export function getVideogames(){
  return function(dispatch){
           axios.get("http://localhost:3001/videogames")
          .then(response => {
              return dispatch({
                  type: "GET_GAMES",
                  payload: response.data
              })
  })
}}
// export function getVideogames() {
//   return async function (dispatch) {
//     const response = await axios.get("http://localhost:3001/videogames");
//     let json = response.data;
//     dispatch({ type: "GET_GAMES", payload: json });
//   };
// }
export function getDietTypes() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/genres", {});
    dispatch({ type: "GET_GENRES", payload: json.data });
  };
}
export function getQVideogames(title) {
  return async function(dispatch){
    try {
        var json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
        return dispatch({
            type: "GET_QUERY",
            payload: json.data
        })  
    } catch (error) {
        console.log(error)
    }}
}
export function getDetails(id) {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/videogames/" + id);
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
        let json = await axios.post("http://localhost:3001/videogames", payload);
        return dispatch({
          type: "POST_GAME",
          payload: json.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  };

export function deleteById(id){
  return async function(dispatch){
    try{
      const json = await axios.get(`http://localhost:3001/${id}/delete`)
      return dispatch({ type: "DELETE_BY_ID", payload: json.data})
    }catch(err){
      console.log(err)
    }
    }
}