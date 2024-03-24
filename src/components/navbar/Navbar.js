import React from 'react';
import './Navbar.css';
import Sidebar from '../sidebar/Sidebar';
import notification from '../../assets/notification.png'
import logout from '../../assets/logout.png'
import verticalline from '../../assets/verticalline.png'
import search from '../../assets/search.png'

function Navbar() {
    return (
        <div className='navbar'>
            <div className='heading-content'>

                <div>
                    <h2 className='heading1'>Covid-19</h2>
                </div>

                <div>
                    <span style={{marginLeft:"26px",fontSize:"12px"}}>Live tracker Dashboard</span>
                </div>

            </div>

            <div className="search">
                <div className='search-input'>
                    <input type="text" placeholder="Search..." />
                </div>
                <div className='img-search'>
                    <img style={{ height: "20px", width: "20px" }} src={search}></img>
                </div>



            </div>
            <div className='profile-content'>
                <div className="photos" >
                    <img style={{ borderRadius: "100%", height: "30px", width: "30px" }} src="https://xsgames.co/randomusers/avatar.php?g=male" alt="User Avatar"></img>
                    <div className="dropdown">

                        <span className="dropdown-symbol">&#9660;</span>

                    </div>
                </div>

                <div className='verticalline'>
                    <img style={{height:"30px",width:"16px"}} src={verticalline}></img>
                </div>
                <div className="user-symbol">
                    <div>
                        <img style={{ height: "20px", width: "20px" }} src={notification}></img>
                    </div>
                    <div>
                        <img style={{ height: "20px", width: "20px" }} src={logout}></img>
                    </div>
                </div>

            </div>

            <Sidebar />
        </div>
    );
}

export default Navbar;
