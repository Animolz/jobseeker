import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import './css/Header.scss'
// import { useState } from 'react';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import UserInfo from '../common/User/UserInfo';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthService from 'services/AuthService';
import { toast } from 'react-toastify';
import useAuth from 'hooks/useAuth';

const Header = () => {
    const userMenu = useRef();
    const { auth, setAuth } = useAuth(); 
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    const toggling = () => setIsOpen(!isOpen);
    
    const closeOpenMenus = (e)=>{
        if(userMenu.current.contains(e?.target)) {
            return;
        }
        setIsOpen(false);
    }

    const logoutHandling = () => {
        if(auth?.accessToken){
            setIsOpen(false);
            setAuth({});
            sessionStorage.clear();
            toast.success('Logout successfully!');
            if(location?.pathname == '/edit-profile'){
                navigate('/login', { replace: true });
            }
        }
        else{
            toast.error('Logout failed!');
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeOpenMenus);

        return () => {
            document.removeEventListener('mousedown', closeOpenMenus);
        }
    }, [isOpen])

    return(
        <React.Fragment>
            <Navbar collapseOnSelect expand='lg' sticky='top' bg='light' className='px-3 box-shadow-1'>
                <Navbar.Brand className='p-0'><Link to='/' className='navbar__logo'><img src='/images/technology.png' className="logo" /></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav'></Navbar.Toggle>
                <Navbar.Collapse id='responsive-navbar-nav' className='justify-content-between'>
                    <Nav className='me-auto'>
                        <Nav.Link className='p-0'>
                            <NavDropdown className='' title='Jobs' id='collapsible-nav-dropdown'>
                                <Container>
                                    <NavDropdown.Item href='' >
                                        <Link to='/candidate/job-searching' className='w-100 d-flex text-center link--underline-none'>
                                            <p className='navbar-items__icon'><i className="fa-solid fa-bullseye"></i></p>
                                            <p>Jobs Seeking</p>
                                        </Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href='#' className='w-100 d-flex text-center'>
                                        <p className='navbar-items__icon'><i className="fa-solid fa-heart"></i></p>
                                        <p>Saved Jobs</p>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href='#' className='w-100 d-flex text-center'>
                                        <p className='navbar-items__icon'><i className="fa-solid fa-briefcase"></i></p>
                                        <p>Applied Jobs</p>
                                    </NavDropdown.Item>
                                </Container>
                            </NavDropdown>
                        </Nav.Link>
                        {auth?.role !== 'COMPANY' && auth?.role !== 'ADMIN' && (
                            <>
                                <Nav.Link className='p-0'>
                                    <NavDropdown className='' title='Personal Documents' id='collapsible-nav-dropdown'>
                                        <Container>
                                            <NavDropdown.Item href='#' className='w-100 d-flex text-center'>
                                                <p className='navbar-items__icon'><i className="fa-solid fa-rectangle-list"></i></p>
                                                <p>CV Managing</p>
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href='#' className='w-100 d-flex text-center'>
                                                <p className='navbar-items__icon'><i className="fa-solid fa-file-lines"></i></p>
                                                <p>CV Examples</p>
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href='#' className='w-100 d-flex text-center'>
                                                <p className='navbar-items__icon'><i className="fa-solid fa-phone-volume"></i></p>
                                                <p>CV Advisory</p>
                                            </NavDropdown.Item>
                                        </Container>
                                    </NavDropdown>
                                </Nav.Link>
                                <Nav.Link className='p-0'>
                                    <NavDropdown className='' title='Understand Yourself' id='collapsible-nav-dropdown' >
                                        <Container>
                                            <NavDropdown.Item href='#' className='w-100 d-flex text-center'>
                                                <p className='navbar-items__icon'><i className="fa-solid fa-thumbs-up"></i></p>
                                                <p>RIASEC Test</p>
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href='#' className='w-100 d-flex text-center'>
                                                <p className='navbar-items__icon'><i className="fa-solid fa-brain"></i></p>
                                                <p>MI Test</p>
                                            </NavDropdown.Item>
                                        </Container>
                                    </NavDropdown>
                                </Nav.Link>
                            </>
                        )}

                        {auth?.role === 'COMPANY' && (
                            <Nav.Link className='mr-2 p-2'>
                                <Link to='/company/home' className='link--underline-none p-2'>Company's Management</Link>
                            </Nav.Link>
                        )}

                        {auth?.role === 'ADMIN' && (
                            <Nav.Link className='mr-2 p-2'>
                                <Link to='/admin/home' className='link--underline-none p-2'>Admin's Management</Link>
                            </Nav.Link>
                        )}
                        <Nav.Link className='p-0'>
                            <NavDropdown className='' title='Tools' id='collapsible-nav-dropdown' >
                                <Container>
                                    <NavDropdown.Item href='#' className='w-100 d-flex text-center'>
                                        <p className='navbar-items__icon'><i className="fa-solid fa-calculator"></i></p>
                                        <p>GROSS-NET Calculator</p>
                                    </NavDropdown.Item>
                                </Container>
                            </NavDropdown>
                        </Nav.Link>
                        <Nav.Link href='#news' className='mr-2 p-0'>
                            <NavDropdown className='' title='Blogs'></NavDropdown>
                        </Nav.Link>
                    </Nav>
                    <div className='position-relative navbar-user desktop' ref={userMenu}>
                        {auth?.accessToken 
                            ? <a href='#' className='align-items-center d-flex m-0 justify-content-center navbar-user__link link--underline-none'
                                onClick={toggling}><UserInfo user={auth}/></a>
                            : (<>
                                <Link to={'/login'} className='btn btn-outline-secondary'><b>Login</b></Link>
                                <Link to='/register' className='btn btn-success ml-3'><b>Signup</b></Link>
                            </>)
                        }
                        {isOpen &&
                        (<div className='position-absolute navbar-user__dropdown-container box-shadow-1 rounded p-1 m-0' ref={userMenu}>
                            <ul className='navbar-user__dropdown-menu' id=''>
                                <li>
                                    {auth?.role === 'CANDIDATE' && <Link to='/edit-profile' className='row'><i className="fa-solid fa-user-pen col-xs-2"></i><span className='col-xs-10'>Profile</span></Link>}
                                    {auth?.role === 'COMPANY' && <Link to='/company/edit-profile' className='row'><i className="fa-solid fa-user-pen col-xs-2"></i><span className='col-xs-10'>Profile</span></Link>}
                                </li>
                                <li><a href='#settings' className='row'><i className="fa-solid fa-gear col-xs-2"></i><span className='col-xs-10'>Settings</span></a></li>
                                <li><button className='row btn' onClick={logoutHandling}><i className="fa-solid fa-door-open col-xs-2"></i><span className='col-xs-10'>Logout</span></button></li>
                            </ul>
                        </div>
                        )}
                    </div>
                </Navbar.Collapse>
            </Navbar>
        </React.Fragment>
    )
}

export default Header;
