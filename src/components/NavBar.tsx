import { Container, Navbar } from "react-bootstrap";

const NavBar: React.FC = () => {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>Users</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBar;
