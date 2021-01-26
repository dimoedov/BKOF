import React, {Component} from 'react';
import './Header.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

class Header extends Component {
    get_cookie ( cookie_name )
    {
        let results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
        if ( results )
            return ( unescape ( results[2] ) );
        else
            return null;
    }
        render() {
            if (this.get_cookie('Authorized') !== null){
                if (localStorage.getItem('position') === 'Администратор'){
                    return (
                        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                            <Link to='/'><Navbar.Brand>OOO"БКОФ" / "BKOF" udp.</Navbar.Brand></Link>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link> <Link className="nav-link text-white-50 text-decoration-none" to='/all-fix'> Акты </Link> </Nav.Link>
                                    <Nav.Link> <Link className="nav-link text-white-50 text-decoration-none" to='/clients'> Заказчик </Link> </Nav.Link>
                                    <Nav.Link> <Link className="nav-link text-white-50 text-decoration-none" to='/objects'> Судна </Link> </Nav.Link>
                                </Nav>
                                <Nav>
                                    <Nav.Link><Link className="nav-link text-white-50 text-decoration-none" to='/help'>Помощь</Link></Nav.Link>
                                    <NavDropdown title={localStorage.getItem('fio')} id="collasible-nav-dropdown">
                                        <NavDropdown.Item> <Link className="nav-link text-black-50 text-decoration-none" to='/my-fix'>Мои акты</Link> </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item> <Link className="nav-link text-black-50 text-decoration-none" to='/signout'>Выйти</Link> </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    );
                }else {
                    return (
                        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                            <Link to='/'><Navbar.Brand>OOO"БКОФ" / "BKOF" udp.</Navbar.Brand></Link>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link> <Link className="nav-link text-white-50 text-decoration-none" to='/all-fix'> Акты </Link> </Nav.Link>
                                    <Nav.Link> <Link className="nav-link text-white-50 text-decoration-none" to='/clients'> Заказчик </Link> </Nav.Link>
                                    <Nav.Link> <Link className="nav-link text-white-50 text-decoration-none" to='/objects'> Судна </Link> </Nav.Link>
                                </Nav>
                                <Nav>
                                    <Nav.Link><Link className="nav-link text-white-50 text-decoration-none" to='/help'>Помощь</Link></Nav.Link>
                                    <NavDropdown title={localStorage.getItem('fio')} id="collasible-nav-dropdown">
                                        <NavDropdown.Item> <Link className="nav-link text-black-50 text-decoration-none" to='/my-fix'>Мои акты</Link> </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item> <Link className="nav-link text-black-50 text-decoration-none" to='/signout'>Выйти</Link> </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    );
                }

            }else{
                return (
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Link to='/'><Navbar.Brand>OOO"БКОФ" / "BKOF" udp.</Navbar.Brand></Link>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav>
                                <Nav.Link><Link className="nav-link text-white-50 text-decoration-none" to='/help'>Помощь</Link></Nav.Link>
                                <Nav.Link> <Link className="nav-link text-white-50 text-decoration-none" to='/auth'> Войти </Link> </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                );
            }
        }

}
export default Header;