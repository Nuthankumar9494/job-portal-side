import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    NavbarToggler,
    Collapse,
} from 'reactstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggle = () => setIsOpen(!isOpen);

    const handleNavigate = () => {
        navigate('/bookmarks');
    }

    return (
        <Navbar
            color="primary"
            light
            expand="md"
            fixed="top"
            className="custom-navbar"
        >
            <Container className="d-flex justify-content-between align-items-center">
                <NavbarBrand href="/">
                    <img
                        src="https://mgssoftech.in/wp-content/uploads/2025/06/LOGO2-removebg-preview.png"
                        alt="Logo"
                        style={{ height: '80px', width: 'auto' }}
                    />
                </NavbarBrand>

                <NavbarToggler onClick={toggle} />

                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ms-auto" navbar>
                        <NavItem>
                            <NavLink onClick={handleNavigate} className="button-link text-light navlink border border-2 rounded">
                                Book Marked
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
