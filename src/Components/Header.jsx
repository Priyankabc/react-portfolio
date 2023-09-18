import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function Header() {
  return (
    <div>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/"><FontAwesomeIcon icon={faBookOpenReader} /> <span>Courses</span></Navbar.Brand>
          <Nav className="mr-auto">
            <Link to="/">Home</Link>
            <Link to="/postlist">Users</Link>
            <Link to="/" className="login-btn">Login</Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
