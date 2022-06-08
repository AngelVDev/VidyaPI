import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogames } from "../store/actions";
import "./Styles/Home.css";
import Cards from "./Cards";
import Loader from "./Loader";
import Searchbar from "./Searchbar";
import Filters from "./Filters";
import Pagination from "./Pagination";
import vid from "../assets/vid.mp4";
import { ButtonT, StyledLink } from "./Styles/Styled";

const Home = () => {
  const games = useSelector((state) => state.allGames);
  const gens = useSelector((state) => state?.genres);
  const dispatch = useDispatch();
  /*<--Pagination-->*/
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games?.slice(indexOfFirstGame, indexOfLastGame);
  const PAGINATION = (pageNum) => {
    setCurrentPage(pageNum);
  };

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  if (games && gens) {
    return (
      <div key={"parent"} className="Wall">
        <video loop autoPlay>
          <source src={vid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h3 key={"h3"} className="Welcome">
          The sight of all this games, fills you with determination 🌟
        </h3>
        <nav key={"justNav"} className="Navi">
          <ButtonT key={"butCreate"}>
            <StyledLink style={{ textDecoration: "none" }} to="/create">
              Let's create a new one
            </StyledLink>
          </ButtonT>
          <Filters gens={gens} />
          <Searchbar />
        </nav>
        <div key={"cCont"} id="cardContainer">
          {games &&
            currentGames?.map((GG) => {
              return (
                <Link
                  key={"thoseLinks." + GG.id}
                  style={{ textDecoration: "none" }}
                  to={"/home/" + GG.id}
                >
                  <Cards
                    name={GG.name}
                    image={GG.image}
                    genres={GG.genres}
                    rating={GG.rating}
                    key={GG.id}
                  />
                </Link>
              );
            })}
        </div>
        <Pagination
          gamesPerPage={gamesPerPage}
          games={games.length}
          pagination={PAGINATION}
        />
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default Home;
