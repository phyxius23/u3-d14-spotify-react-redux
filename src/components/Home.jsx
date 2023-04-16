import { Col, Row } from "react-bootstrap";
import AlbumCard from "./AlbumCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  // imposto lo state locale per eseguire le fetch automatiche per la homepage
  const [rock, setRock] = useState([]);
  const [pop, setPop] = useState([]);
  const [hippop, setHipPop] = useState([]);

  // recupero lo stato globale search
  const search = useSelector((state) => state.search.content);

  const handleArtist = async (query) => {
    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=" + query);

      if (response.ok) {
        let { data } = await response.json();

        switch (query) {
          case "rock":
            return setRock(data.slice(0, 4));

          case "pop":
            return setPop(data.slice(0, 4));

          case "hippop":
            return setHipPop(data.slice(0, 4));

          default:
            return console.log("error");
        }
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // qui eseguo le fetch per le 3 sezioni sotto
    handleArtist("rock");
    handleArtist("pop");
    handleArtist("hippop");
  }, []);

  return (
    <Col xs={12} md={9} className="offset-md-3 mainPage">
      <Row>
        <Col xs={9} lg={11} className="mainLinks d-none d-md-flex">
          {/* ho posizionato una lettera dopo l'underscore per non avere un warning di ritorno */}
          <Link to={`/`}>TRENDING</Link>
          <Link to={`/`}>PODCAST</Link>
          <Link to={`/`}>MOODS AND GENRES</Link>
          <Link to={`/`}>NEW RELEASES</Link>
          <Link to={`/`}>DISCOVER</Link>
        </Col>
      </Row>

      {search.length > 0 && (
        <Row>
          <Col xs={10}>
            <div id="searchResults">
              <h2>Search Results</h2>
              <Row xs={1} sm={2} lg={3} xl={4} className="imgLinks py-3">
                {search.map((album) => (
                  <AlbumCard key={album.id} album={album} />
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      )}

      {rock.length > 0 && (
        <Row>
          <Col xs={10}>
            <div id="rock">
              <h2>Rock Classics</h2>
              <Row xs={1} sm={2} lg={3} xl={4} className="imgLinks py-3" id="rockSection">
                {rock.map((album) => (
                  <AlbumCard key={album.id} album={album} />
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      )}

      {pop.length > 0 && (
        <Row>
          <Col xs={10}>
            <div id="pop">
              <h2>Pop Culture</h2>
              <Row xs={1} sm={2} lg={3} xl={4} className="imgLinks py-3" id="popSection">
                {pop.map((album) => (
                  <AlbumCard key={album.id} album={album} />
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      )}

      {hippop.length > 0 && (
        <Row>
          <Col xs={10}>
            <div id="hiphop">
              <h2>#HipHop</h2>
              <Row xs={1} sm={2} lg={3} xl={4} className="imgLinks py-3" id="hipHopSection">
                {hippop.map((album) => (
                  <AlbumCard key={album.id} album={album} />
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      )}
    </Col>
  );
};
export default Home;
