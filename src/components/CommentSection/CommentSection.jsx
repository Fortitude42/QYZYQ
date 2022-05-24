import React , {useState} from 'react'
import axios from 'axios';
import { getCurrentUser } from '../../Services/UserInfo.js';
import SingleComment from '../../components/SingleComment/SingleComment';
import './CommentSection.css'
import { useNavigate } from 'react-router-dom'

function CommentSection(props) {
    const [Comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const navigate = useNavigate();

    const onSubmit = async(e) => {
        e.preventDefault();

        if(!(await getCurrentUser()).isLoggedIn) {
            navigate('/login');
            return;
        }

        const variables = {
            description: Comment,
            author: "Parassat",
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
        <div className='w-100'>
            <form className='w-100 ps-4' onSubmit={onSubmit}>
                <div className='d-flex w-100'>
                    <img className="br-50 " height={80} src="/img/sample.webp" alt=""/>
                    <textarea                    
                        onChange={handleChange}
                        value={Comment}
                        rows="4"
                        className='ms-4 ps-4 pt-2 pt-1 rounded w-75'
                        placeholder="write some comments"
                    >                        
                    </textarea>
                </div>
                <div className='w-85 d-flex justify-content-end mt-2 '>
                    <button type="button"  className='btn btn-primary' onClick={onSubmit}>Submit</button>
                </div>
                
            </form>

            {props.CommentLists && props.CommentLists.map((comment) => (
                <SingleComment comment={comment} refreshFunction={props.refreshFunction} />
            ))}

        </div>
    )
}

export default CommentSection