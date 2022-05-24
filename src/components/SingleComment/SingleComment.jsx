import React from "react";
import { Comment, Avatar } from 'antd';


function SingleComment(props){
    return (
        <div>
            <Comment
                author={props.comment.author}
                avatar={
                    <Avatar
                        src="/img/sample.webp"
                        alt="image"
                    />
                }
                content={
                    <p>
                        {props.comment.description}
                    </p>
                }
            ></Comment>
        </div>
    )
}

export default SingleComment;