import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import './css/Header.scss'
// import { useState } from 'react';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import UserInfo from '../common/User/UserInfo';
import { Link } from 'react-router-dom';

const user = ({
    "id" : 1,
    "username": "Animolz",
    "avatar": "/images/logo192.png"
    })

const Header = () => {
    const userMenu = useRef();
    const [isOpen, setIsOpen] = useState(false);
    
    const toggling = () => setIsOpen(!isOpen);
    
    const closeOpenMenus = (e)=>{
        if(userMenu.current.contains(e.target)) {
            console.log('clicked inside');
            return;
        }

        console.log('clicked outside scope');
        setIsOpen(false);
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeOpenMenus);

        return () => {
            document.removeEventListener('mousedown', closeOpenMenus);
        }
    }, [isOpen])

    return(
        <React.Fragment>
            <Navbar collapseOnSelect expand='lg' sticky='top' bg='light'>
                <Navbar.Brand className='p-0'><Link to='/' className='rounded-circle logo-container'><img src='/images/technology.png' className="logo" /></Link></Navbar.Brand>
                <div className='position-relative user-dropdown responsive' ref={userMenu}>
                    <a href='#' className='align-items-center d-flex m-0 justify-content-center user-info' id='user-dropdown-toggle'
                        onClick={toggling}><UserInfo user={user}/></a>
                    {isOpen &&
                    (<div className='position-absolute user-dropdown-container' ref={userMenu}>
                        <ul className='user-dropdown-menu' id=''>
                            <li><a href='#profile'>Thông tin cá nhân</a></li>
                            <li><a href='#settings'>Cài đặt</a></li>
                            <li><a href='#logout'>Đăng xuất</a></li>
                        </ul>
                    </div>
                    )}
                </div>
                <Navbar.Toggle aria-controls='responsive-navbar-nav'></Navbar.Toggle>
                <Navbar.Collapse id='responsive-navbar-nav' className='justify-content-between'>
                    <Nav className='me-auto'>
                        <Nav.Link className='p-0'>
                            <NavDropdown className='' title='Việc làm' id='collapsible-nav-dropdown'>
                                <Container>
                                    <NavDropdown.Item href='' >
                                        <Link to='/candidate/job-searching' className='w-100 d-flex text-center'>
                                            <p className='item-icons'><i className="fa-solid fa-bullseye"></i></p>
                                            <p>Tìm việc làm</p>
                                        </Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href='#' className='w-100 d-flex text-center'>
                                        <p className='item-icons'><i className="fa-solid fa-heart"></i></p>
                                        <p>Việc làm đã lưu</p>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href='#' className='w-100 d-flex text-center'>
                                        <p className='item-icons'><i className="fa-solid fa-briefcase"></i></p>
                                        <p>Việc làm đã ứng tuyển</p>
                                    </NavDropdown.Item>
                                </Container>
                            </NavDropdown>
                        </Nav.Link>
                        <Nav.Link className='p-0'>
                            <NavDropdown className='' title='Hồ sơ và CV' id='collapsible-nav-dropdown'>
                                <Container>
                                    <NavDropdown.Item href='#' className='w-100 d-flex text-center'>
                                        <p className='item-icons'><i className="fa-solid fa-rectangle-list"></i></p>
                                        <p>Quản lý CV</p>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href='#' className='w-100 d-flex text-center'>
                                        <p className='item-icons'><i className="fa-solid fa-file-lines"></i></p>
                                        <p>Mẫu CV</p>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href='#' className='w-100 d-flex text-center'>
                                        <p className='item-icons'><i className="fa-solid fa-phone-volume"></i></p>
                                        <p>Tư vấn CV</p>
                                    </NavDropdown.Item>
                                </Container>
                            </NavDropdown>
                        </Nav.Link>
                        <Nav.Link className='p-0'>
                            <NavDropdown className='' title='Trắc nghiệm bản thân' id='collapsible-nav-dropdown' >
                                <Container>
                                    <NavDropdown.Item href='#' className='w-100 d-flex text-center'>
                                        <p className='item-icons'><i className="fa-solid fa-thumbs-up"></i></p>
                                        <p>Trắc nghiệm RIASEC</p>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href='#' className='w-100 d-flex text-center'>
                                        <p className='item-icons'><i className="fa-solid fa-brain"></i></p>
                                        <p>Trắc nghiệm MI</p>
                                    </NavDropdown.Item>
                                </Container>
                            </NavDropdown>
                        </Nav.Link>
                        <Nav.Link className='p-0'>
                            <NavDropdown className='' title='Công cụ' id='collapsible-nav-dropdown' >
                                <Container>
                                    <NavDropdown.Item href='#' className='w-100 d-flex text-center'>
                                        <p className='item-icons'><i className="fa-solid fa-calculator"></i></p>
                                        <p>Tính lương GROSS-NET</p>
                                    </NavDropdown.Item>
                                </Container>
                            </NavDropdown>
                        </Nav.Link>
                        <Nav.Link href='#news' className='mr-2 p-0'>
                            <NavDropdown className='' title='Bài viết'></NavDropdown>
                        </Nav.Link>
                    </Nav>
                    <div className='position-relative user-dropdown desktop' ref={userMenu}>
                        <a href='#' className='align-items-center d-flex m-0 justify-content-center user-info' id='user-dropdown-toggle'
                            onClick={toggling}><UserInfo user={user}/></a>
                        {isOpen &&
                        (<div className='position-absolute user-dropdown-container' ref={userMenu}>
                            <ul className='user-dropdown-menu' id=''>
                                <li><Link to='/edit-profile' className='row'><i className="fa-solid fa-user-pen col-xs-2"></i><span className='col-xs-10'>Thông tin cá nhân</span></Link></li>
                                <li><a href='#settings' className='row'><i className="fa-solid fa-gear col-xs-2"></i><span className='col-xs-10'>Cài đặt</span></a></li>
                                <li><a href='#logout' className='row'><i className="fa-solid fa-door-open col-xs-2"></i><span className='col-xs-10'>Đăng xuất</span></a></li>
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
