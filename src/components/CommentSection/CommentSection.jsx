import React , {useState} from 'react'
import axios from 'axios';
import { Button, Input } from 'antd';
import { isLogged } from '../../Services/UserInfo.js';
import SingleComment from '../../components/SingleComment/SingleComment';
const { TextArea } = Input;

function CommentSection(props) {
    const [Comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = async(e) => {
        e.preventDefault();

        if(!await isLogged())
            return;

        const variables = { 
            description: Comment,
            author: Comment,
            postId: props.postId,
         }

        axios.post('http://localhost:5000/comments/postComment', variables)
        .then(res => {
            if(res.data == "Comment added"){
                props.refreshFunction(res);
            }
        })
    }

    return (
        <div>
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="write some comments"
                />
                
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>

            {props.CommentLists && props.CommentLists.map((comment) => (
                <React.Fragment>
                    <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                </React.Fragment>
            ))}

        </div>
    )
}

export default CommentSection