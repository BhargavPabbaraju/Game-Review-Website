import React from "react";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";


const NavigationSidebar = () => {
    const {pathname} = useLocation();
    const paths = pathname.split('/')
    const active = paths[1];

    return (
        <div className="list-group">
            <Link to="/home" className={`list-group-item ${active === 'home'?'active':''}`}>
                <i className="bi bi-house-fill pe-1"></i>
                <span className="d-none d-xl-inline"> Home</span>
            </Link>
            <Link to="/search" className={`list-group-item ${active === 'search'?'active':''}`}>
                <i className="bi bi-search pe-1"></i>
                <span className="d-none d-xl-inline"> Search</span>
            </Link>
            <Link to="/profile" className={`list-group-item ${active === 'profile'?'active':''}`}>
                <i className="bi bi-person-fill pe-1"></i>
                <span className="d-none d-xl-inline"> Profile</span>
            </Link>
            <Link to="/searchPeople" className={`list-group-item ${active === 'search-people'?'active':''}`}>
                <i className="bi bi-person-lines-fill pe-1"></i>
                <span className="d-none d-xl-inline"> Search People</span>
            </Link>
            <Link to="/addGame" className={`list-group-item ${active === 'add-game'?'active':''}`}>
                <i className="bi bi-controller pe-1"></i>
                <span className="d-none d-xl-inline"> Add Game</span>
            </Link>
            <Link to="/viewGame" className={`list-group-item ${active === 'view-game'?'active':''}`}>
                <i className="bi bi-view-list pe-1"></i>
                <span className="d-none d-xl-inline"> View Your Games</span>
            </Link>
            <Link to="/more" className={`list-group-item ${active === 'logout'?'active':''}`}>
                <i className="bi bi-box-arrow-left pe-1"></i>
                <span className="d-none d-xl-inline"> Logout</span>
            </Link>
        </div>
    );
};
export default NavigationSidebar;