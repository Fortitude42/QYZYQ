import React , {useEffect, useState} from 'react'
import axios from 'axios';
import { getCurrentUser } from '../../Services/UserInfo.js';
import SingleComment from '../../components/SingleComment/SingleComment';
import './CommentSection.css'
import { useNavigate } from 'react-router-dom'

function CommentSection(props) {
    const [Comment, setComment] = useState("")
    const [currentUser, setCurrentUser] = useState({
        isLoggedIn: false,
    });
    
    async function setUser() {
        const user = await getCurrentUser();
        setCurrentUser(user);
    }

    useEffect(() => {
        setUser();
    })

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const navigate = useNavigate();

    const onSubmit = async(e) => {
        e.preventDefault();

        if(!currentUser.isLoggedIn) {
            navigate('/login');
            return;
        }
        
        const variables = {
            description: Comment,
            authorId: currentUser.id,
            insterestId: props.insterestId,
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
                <img className="br-50 mt-4" width={80} height={80} src={`/img/${currentUser.picture}`} onError={(e)=>{e.target.onerror = null; e.target.src="/img/sample1.jpg"}} alt=""/>
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

            {props.CommentList && props.CommentList.map((comment) => (
                <SingleComment comment={comment} refreshFunction={props.refreshFunction} />
            ))}

        </div>
    )
}

export default CommentSection;