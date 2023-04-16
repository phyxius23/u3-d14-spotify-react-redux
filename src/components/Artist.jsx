import { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const Artist = () => {
  const params = useParams();

  // stato del componente
  const [artist, setArtist] = useState(null);
  const [artistTrack, setArtistTrack] = useState([]);

  // endpoint per le fetch
  const endpointArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
  const endpointSearch = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

  const getArtist = async (endpoint, query) => {
    try {
      const response = await fetch(endpoint + query);

      if (response.ok) {
        const data = await response.json();

        endpoint.includes("artist") ? setArtist(data) : setArtistTrack(data.data);
      } else {
        console.log("error");
      }
    } catch (error) {}
  };

  useEffect(() => {
    getArtist(endpointArtist, params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (artist) {
      getArtist(endpointSearch, artist.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artist]);

  return (
    <>
      {artist && (
        <Col xs={12} md={9} className="offset-md-3 mainPage">
          <Row className="mb-3">
            <Col xs={9} lg={11} className="mainLinks d-none d-md-flex">
              <Link to={`/`}>TRENDING</Link>
              <Link to={`/`}>PODCAST</Link>
              <Link to={`/`}>MOODS AND GENRES</Link>
              <Link to={`/`}>NEW RELEASES</Link>
              <Link to={`/`}>DISCOVER</Link>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={10} lg={10} className="mt-5">
              <h2 className="titleMain">{artist.name}</h2>
              <div id="followers">{artist.nb_fan}</div>
              <div className="d-flex justify-content-center" id="button-container">
                <Button variant="success" className="me-2 mainButton" id="playButton">
                  PLAY
                </Button>
                <Button variant="outline-light" className="me-2 mainButton" id="followButton">
                  FOLLOW
                </Button>
              </div>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={10} md={10} lg={10} className="offset-1 p-0">
              <div className="mt-4 d-flex justify-content-start">
                <h2 className="text-white font-weight-bold">Tracks</h2>
              </div>
              <div className="pt-5 mb-5">
                <Row id="apiLoaded">
                  {artistTrack.map((track) => (
                    <Col sm="auto" className="text-center mb-5" key={track.id}>
                      <Link to={`/album/${track.album.id}`}>
                        <Image className="img-fluid" src={track.album.cover_medium} alt="" />
                      </Link>

                      <p>
                        <Link to={`/`}>Track: {track.title.length < 16 ? `${track.title}` : `${track.title.substring(0, 16)}...`}</Link>
                        <Link to={`/album/${track.album.id}`}>Album: {track.album.title.length < 16 ? `${track.album.title}` : `${track.album.title.substring(0, 16)}...`}</Link>
                      </p>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
      )}
    </>
  );
};
export default Artist;
