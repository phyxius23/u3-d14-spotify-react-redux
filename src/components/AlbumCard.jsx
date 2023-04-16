import { Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const AlbumCard = ({ album }) => {
  return (
    <Col className="text-center">
      <Link to={`/album/${album.album.id}`}>
        <Image src={album.album.cover_medium} fluid alt="1" />
      </Link>
      <p>
        <Link to={`/album/${album.album.id}`}>Album: {album.album.title}</Link>
        <Link to={`/artist/${album.artist.id}`}>Artist: {album.artist.name}</Link>
      </p>
    </Col>
  );
};
export default AlbumCard;
