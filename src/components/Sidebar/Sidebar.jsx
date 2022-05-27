import React from "react";
import './Sidebar.css'
import { logoutUser } from '../../Services/Auth';

function Sidebar() {
	return (		
        <div id="sidebar-wrapper">
            <ul className="sidebar-nav">
                <li className="mt-4">
                    <a href="/create-interest" className="">Create Interest</a>
                </li>                

                {/* todo remove */}
                <li>
                    <a href="/" onClick={logoutUser}>Logout</a>
                </li>
            </ul>
        </div>                
	)
}

export default Sidebar;