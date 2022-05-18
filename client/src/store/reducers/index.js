const initialState = {
  games: [], //copia burda para hacerle magia
  allGames: [], //las buenas recetas
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
      };
    case "FILTER_SOURCE":
      const copy = [...state.games];
      const bySource =
        action.payload === "MIXED"
          ? copy
          : action.payload === "DB"
          ? state.games.filter((el) => el.createdInDB)
          : state.games.filter((el) => !el.createdInDB);
      return {
        ...state,
        allGames: bySource,
      };
    case "SORT_RATING":
      const falseGames = [...state.games];
      const sortRate =
        action.payload === "Low"
          ? state.games.sort((a, b) => {
              if (a.rating > b.rating) {
                return 1;
              }
              if (b.rating > a.rating) {
                return -1;
              }
              return 0;
            })
          : action.payload === "High"
          ? state.games.sort((a, b) => {
              if (a.rating > b.rating) {
                return -1;
              }
              if (a.rating > b.rating) {
                return 1;
              }
              return 0;
            })
          : falseGames;
      return {
        ...state,
        allGames: sortRate,
      };
    case "SORT_NAME":
      const sorted =
        action.payload === "ASC"
          ? state.games.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : action.payload === "DSC"
          ? state.games.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            })
          : state.allGames;
      return {
        ...state,
        allGames: sorted,
      };
    case "FILTER_GENRES":
      const filteredByGen =
        action.payload === "ALL"
          ? state.games
          : state.games.filter((element) =>
              element.genres.map((el) => el.name).includes(action.payload)
            );
      return {
        ...state,
        allGames: filteredByGen,
      };
    default:
      return {
        ...state,
      };
  }
}
export default rootReducer;
