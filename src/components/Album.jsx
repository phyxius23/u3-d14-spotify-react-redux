import { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToFavouritesAction, isPlayingAction, removeFromFavouritesAction } from "../redux/actions";

const Album = () => {
  // redux store
  const isFavourites = useSelector((state) => state.favourites.content);
  const dispatch = useDispatch();

  // stato del componente
  const [album, setAlbum] = useState(null);

  const params = useParams();

  const endpointAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album/";

  const getAlbum = async (endpoint, query) => {
    try {
      const response = await fetch(endpoint + query);

      if (response.ok) {
        const data = await response.json();

        setAlbum(data);
      } else {
        console.log("errore");
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAlbum(endpointAlbum, params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {album && (
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
            <Col md={3} className="pt-5 text-center" id="img-container">
              <Image src={album.cover} className="card-img img-fluid" alt="Album" />
              <div className="mt-4 text-center">
                <p className="album-title">{album.title}</p>
              </div>
              <div className="text-center">
                <p className="artist-name">{album.artist.name}</p>
              </div>
              <div className="mt-4 text-center">
                <Button id="btnPlay" variant="success" type="button">
                  Play
                </Button>
              </div>
            </Col>
            <Col md={8} className="p-5">
              <Row>
                <Col md={10} className="mb-5" id="trackList">
                  {album.tracks.data.map((track) => (
                    <div className="p-3 trackHover d-flex align-items-center" key={track.id}>
                      <Button
                        bsPrefix="btn-play"
                        variant=""
                        onClick={() => {
                          dispatch(isPlayingAction(track));
                        }}
                      >
                        <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL">
                          <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                        </svg>
                      </Button>
                      <Link to={`/`} className="card-title trackHover flex-grow-1">
                        {track.title}
                      </Link>
                      <small className="duration">
                        {Math.floor(parseInt(track.duration) / 60)}:{parseInt(track.duration) % 60 < 10 ? "0" + (parseInt(track.duration) % 60) : parseInt(track.duration) % 60}
                      </small>
                      <Button
                        bsPrefix="btnPrefs"
                        variant=""
                        className={`${isFavourites.includes(track.id) ? "btnPrefs__yes" : ""}`}
                        onClick={() => {
                          isFavourites.includes(track.id) ? dispatch(removeFromFavouritesAction(track.id)) : dispatch(addToFavouritesAction(track.id));
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                        </svg>
                      </Button>
                    </div>
                  ))}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      )}
    </>
  );
};
export default Album;
