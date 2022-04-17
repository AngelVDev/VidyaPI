const initialState = {
    games: [], //copia burda para hacerle magia
    allGames: [],//las buenas recetas
    genres: [],
    gameDetail: [],
  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case "GET_GAMES":
        return {
          ...state,
          games: action.payload,
          allGames: action.payload,
        };
      case "GET_GENRES":
        return {
          ...state,
          genres: action.payload,
        };
      case "GET_QUERY":
        return {
          ...state,
          allGames: action.payload,
        };
      case "GET_DETAIL":
        return {
          ...state,
          gameDetail: action.payload,
        };
      case "POST_GAME":
        return {
          ...state,
        };
      case "DELETE_BY_ID":
        return {
          ...state,
        }
      default:
        return {
          ...state,
        };
    }
  }
  export default rootReducer;