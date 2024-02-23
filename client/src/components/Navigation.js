import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const StyledSpan = styled.span`
  padding-inline-end: 5px;
`;

const Navigation = () => {
    const [isHeaderActive, setIsHeaderActive] = useState(false);
    const [isNavActive, setIsNavActive] = useState(false);
    const [unreadMessages, setUnreadMessages] = useState([]);
    const [userName, setUserName] = useState('');

    // Predefined user's identifier
    const userId = 1;

    useEffect(() => {

        fetch(`/api/user/${userId}/messages`)
            .then(response => response.json())
            .then(data => {
                if (data && data.userName && data.Messages) {
                    setUserName(data.userName);
                    const unread = data.Messages.filter(message => !message.isRead);
                    setUnreadMessages(unread);
                }
            })
            .catch(error => console.log(`Error occurred fetching user data ${error}`));
    }, []);

    useEffect(() => {
        const listenOnScroll = () => {
            setIsHeaderActive(window.scrollY > 20);
        };
        window.addEventListener('scroll', listenOnScroll);

        // Cleaning up the event listener
        return () => window.removeEventListener('scroll', listenOnScroll);
    }, []);

    const toggleNavbar = () => setIsNavActive(!isNavActive);


    return (
        <header className={isHeaderActive ? 'header active' : 'header'}>
            <div className="container">

                <div className='logo nav-item'>
                    <span>
                        {userName}
                    </span>
                    <span className="online-btn">
                        <ion-icon name="bulb-outline"></ion-icon>
                    </span>
                </div>

                <nav className={isNavActive ? 'navbar active' : 'navbar'}>

                    <div className="wrapper">
                        <button className="nav-close-btn" aria-label="close menu" onClick={toggleNavbar}>
                            <ion-icon name="close-outline" aria-hidden="true"></ion-icon>
                        </button>
                    </div>

                    <ul className="navbar-list">

                        <li className="navbar-item">
                            <Link to='/' className="navbar-link a" onClick={toggleNavbar}>
                                Home Page
                            </Link>
                        </li>
                        <li className="navbar-item d-lg-none border-bottom">
                            <Link to={`/user/${userId}/messages`} className="navbar-link a" onClick={toggleNavbar}>
                                Inbox Page
                            </Link>
                        </li>
                        {
                            unreadMessages.map(unreadMessage => (
                                <li key={unreadMessage.id} className='nav-item overflow-none d-lg-none'>
                                    <Link to={`/message/${unreadMessage.id}`} className='navbar-link a' onClick={toggleNavbar}>
                                        {unreadMessage.subject}
                                    </Link>
                                </li>
                            ))
                        }
                        <li className="navbar-item d-sm-none">
                            <Link to={`/user/${userId}/messages`} className="navbar-link a" onClick={toggleNavbar}>
                                <StyledSpan>
                                    Inbox
                                </StyledSpan>
                                <ion-icon name="notifications-outline" aria-hidden="true"></ion-icon>
                                <span className="btn-badge">{unreadMessages.length}</span>
                            </Link>
                        </li>
                    </ul>

                </nav>

                <div className="header-actions">
                    <button className="header-action-btn d-lg-none" aria-label="notifications" title="Notifications" onClick={toggleNavbar}>
                        <ion-icon name="notifications-outline" aria-hidden="true"></ion-icon>
                        <span className="btn-badge">{unreadMessages.length}</span>
                    </button>
                    <button className="header-action-btn" aria-label="open menu" onClick={toggleNavbar}>
                        <ion-icon name="menu-outline" aria-hidden="true"></ion-icon>
                    </button>

                </div>

            </div>
        </header >
    );
}

export default Navigation;