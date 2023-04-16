import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./assets/css/style.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Home from "./components/Home";
import Album from "./components/Album";
import Artist from "./components/Artist";

function App() {
  return (
    <BrowserRouter>
      <Container fluid>
        <Row>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/album/:id" element={<Album />} />
            <Route path="/artist/:id" element={<Artist />} />
          </Routes>
          <Player />
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
