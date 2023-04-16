import { Button, Col, Form, Image, Nav, Navbar } from "react-bootstrap";
import logo from "../assets/logo/Spotify_Logo.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getSearchAction } from "../redux/actions";

const Sidebar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(getSearchAction(query));

    // try {
    //   const response = await fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=" + query);

    //   if (response.ok) {
    //     let { data } = await response.json();
    //     dispatch(getSearchAction(data));
    //     setQuery("");

    //     console.log("sono nella fetch della sidebar", data);
    //     // setDataArr(data);
    //   } else {
    //     alert("Error fetching results");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <Col xs={2}>
      <Navbar expand="md" className="navbar-white bg-navbar fixed-left justify-content-between py-2 px-3">
        <div className="nav-container">
          <Link to={`/`} className={`navbar-brand`}>
            <Image src={logo} alt="Spotify_Logo" width="131" height="40" />
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto flex-column">
              <Link to={`/`} className={`nav-link`}>
                <i className="fas fa-home fa-lg"></i>&nbsp; Home
              </Link>
              <Link to={`/`} className={`nav-link`}>
                <i className="fas fa-book-open fa-lg"></i>&nbsp; Your Library
              </Link>

              <Form className="d-flex mt-3" onSubmit={handleSubmit}>
                <Form.Control type="text" placeholder="Search" aria-label="Search" value={query} onChange={handleChange} />
                <Button variant="outline-secondary">GO</Button>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </div>

        <div className="nav-btn">
          <Button className="signup-btn" type="button">
            Sign Up
          </Button>
          <Button className="login-btn" type="button">
            Login
          </Button>
          <Link to={`/`}>Cookie Policy</Link> - <Link to={`/`}>Privacy</Link>
        </div>
      </Navbar>
    </Col>
  );
};
export default Sidebar;
