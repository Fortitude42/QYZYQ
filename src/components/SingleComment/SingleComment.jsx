import React from "react";
import './SingleComment.css'

function SingleComment(props){
    return (
        <div className="d-flex ps-4">
            <img className="br-50 mt-4" height={80} src="/img/sample1.jpg" alt=""/>
            <div className="mt-4 ps-2 pe-2 pb-2 ms-4 w-75 border border-1 border-color rounded bg-comment">
                <strong>
                    {props.comment.author}
                </strong><br/>
                <span className="break">
                    {props.comment.description}
                </span>
            </div>
            
        </div>
    )
}

export default SingleComment;