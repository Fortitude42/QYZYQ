import React, { useEffect, useState } from "react";
import './SingleComment.css'
import { findUserById } from '../../Services/UserService';

function SingleComment(props) {
    const [currentUser, setCurrentUser] = useState({
        isLoggedIn: false,
    });
    
    async function setUser() {        
        const user = await findUserById(props.comment.authorId);
        setCurrentUser(user);
    }

    useEffect(() => {
        setUser();
    }, [])

    return (
        <div className="d-flex ps-4">
            <img className="br-50 mt-4" width={80} height={80} src={`/img/${currentUser.picture}`} onError={(e)=>{e.target.onerror = null; e.target.src="/img/sample1.jpg"}} alt=""/>
            <div className="mt-4 ps-2 pe-2 pb-2 ms-4 w-75 border border-1 border-color rounded bg-comment">
                <strong>
                    {currentUser.firstName} {currentUser.lastName}
                </strong><br/>
                <span className="break">
                    {props.comment.description}
                </span>
            </div>
            
        </div>
    )
}

export default SingleComment;