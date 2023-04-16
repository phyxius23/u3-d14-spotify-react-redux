import { Col, Container, Image, Row } from "react-bootstrap";
import shuffle from "../assets/playerbuttons/Shuffle.png";
import previous from "../assets/playerbuttons/Previous.png";
import play from "../assets/playerbuttons/Play.png";
import next from "../assets/playerbuttons/Next.png";
import repeat from "../assets/playerbuttons/Repeat.png";
import { useSelector } from "react-redux";

const Player = () => {
  const isPlaying = useSelector((state) => state.player.content);

  return (
    <Container fluid className="fixed-bottom bg-container playerBottom">
      <Row className="align-items-center h-100">
        <Col lg={3} className="coverPlayer">
          <div className="d-flex align-items-center justify-content-start">
            {isPlaying && (
              <>
                <Image src={isPlaying.album.cover_small} className="img-fluid" />
                <div className="text-truncate">
                  <p className="ps-2 mb-0 text-truncate text-white">{isPlaying.title}</p>
                  <p className="ps-2 mb-0 text-truncate text-white">{isPlaying.artist.name}</p>
                </div>
              </>
            )}
          </div>
        </Col>

        <Col lg={6} className="justify-content-center d-flex flex-column">
          <Row className="justify-content-center">
            <Col xs={6} md={4} lg={4} className="playerControls mt-1">
              <Row>
                <div>
                  <Image src={shuffle} alt="shuffle" />
                </div>
                <div>
                  <Image src={previous} alt="previous" />
                </div>
                <div>
                  <Image src={play} alt="play" />
                </div>
                <div>
                  <Image src={next} alt="next" />
                </div>
                <div>
                  <Image src={repeat} alt="repeat" />
                </div>
              </Row>
            </Col>
          </Row>

          <Row className="justify-content-center playBar py-3">
            <Col xs={8} md={6}>
              <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default Player;
