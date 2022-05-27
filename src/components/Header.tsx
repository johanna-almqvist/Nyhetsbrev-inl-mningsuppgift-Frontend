import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Header() {
  const myStyle = {
    color: "white",
    backgroundColor: "green",
    padding: "10px",
    fontFamily: "Sans-Serif",
  };
  return (
    <>
      <Navbar style={myStyle}>
        <Container>
          <Navbar>Bästa MTB stigarna</Navbar>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav>
            <Nav>
              <Link to="/Join">
                <Button variant="light" size="lg">
                  Ny medlem
                </Button>
              </Link>
            </Nav>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
