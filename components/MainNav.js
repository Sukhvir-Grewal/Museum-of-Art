import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/router';

function MainNav() {
    const Router = useRouter()
    const [inputValue, setInputValue] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        Router.push('/artwork?title=true&q=' + inputValue)
    }

    function handleChangeValue(e) {
        setInputValue(e.target.value)
    }

    return (
        <>
            <Navbar expand="lg" className="fixed-top navbar-dark bg-dark" >
                <Container>
                    <Navbar.Brand href="#home">Sukhvir</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href='/' passHref legacyBehavior><Nav.Link>Home</Nav.Link></Link>
                            <Link href='/search' passHref legacyBehavior><Nav.Link>Advanced Search</Nav.Link></Link>
                        </Nav>
                    </Navbar.Collapse>
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
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    );
}

export default MainNav;