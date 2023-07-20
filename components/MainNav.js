import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useState, useTransition } from 'react';
import { useRouter } from 'next/router';

function MainNav() {
    const Router = useRouter()
    const [inputValue, setInputValue] = useState('')
    const [isExpanded, setIsExpanded] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        Router.push('/artwork?title=true&q=' + inputValue)
        setIsExpanded(false)
    }

    function handleChangeValue(e) {
        setInputValue(e.target.value)
    }

    function toggleIsExpended(){
        setIsExpanded(!isExpanded)
    } 
    function handleNavLink(){
        setIsExpanded(false)
    } 
    return (
        <>
            <Navbar expand="lg" className="fixed-top navbar-dark bg-dark" expanded={isExpanded}>
                <Container fluid>
                    <Navbar.Brand href="">Sukhvir</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleIsExpended}/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href='/' passHref legacyBehavior ><Nav.Link onClick={handleNavLink}>Home</Nav.Link></Link>
                            <Link href='/search' passHref legacyBehavior ><Nav.Link onClick={handleNavLink}>Advanced Search</Nav.Link></Link>
                        </Nav>
                        &nbsp;
                        <Form className="d-flex" onSubmit={handleSubmit}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={inputValue}
                                onChange={handleChangeValue}
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        &nbsp;
                        <Nav>
                            <NavDropdown title="User Name" id="basic-nav-dropdown">
                                <Link href='/favourites' passHref legacyBehavior><NavDropdown.Item onClick={handleNavLink}>Favorites</NavDropdown.Item></Link>
                                <Link href='/history' passHref legacyBehavior><NavDropdown.Item onClick={handleNavLink}>History</NavDropdown.Item></Link>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    );
}

export default MainNav;