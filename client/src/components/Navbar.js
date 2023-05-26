import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function OffcanvasExample() {
  const navigate = useNavigate();

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    } catch (err) {
      console.error(err.message);
    }
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    checkAuthenticated();
  });

  const handleLogout = () => {
    if (isAuthenticated) {
      localStorage.removeItem('token');
      toast.success("Logout Successful '\n'", {
        onClose: () => {
          navigate("/");
        }
      })

    }
  };
  return (
    <>
      {['md'].map((expand) => (
        <Navbar key={expand} bg="dark" expand={expand} className="mb-3" variant='dark'>
          <Container fluid>
            <Navbar.Brand href="#">Pharmex</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              className="bg-dark navbar-dark"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {
                    isAuthenticated && (
                      <>
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
                      </>
                    )
                  }

                  {
                    !isAuthenticated && (
                      <>
                        <Nav.Link href="/CustomerRegistration">Register</Nav.Link>
                        <Nav.Link href="/Login">Login</Nav.Link>
                      </>
                    )
                  }

                  <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            type="success"
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;