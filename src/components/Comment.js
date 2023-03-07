import { db } from '../configuration/firebase'
import { auth } from '../configuration/firebase'
import { useState, useEffect } from 'react'
import { getDocs, collection, addDoc, deleteDoc, doc, Timestamp, orderBy, query } from 'firebase/firestore'
import { FaRegUserCircle } from 'react-icons/fa';
import { ImBin } from 'react-icons/im';
import './Comment.css'
import data from './Data'



const Comment = () => {

    const [commentList, setCommentList] = useState([])
    const [newCommentBody, setNewCommentBody] = useState('')

    const commentsList = collection(db,"comments") // get firebase collection according its name

    const getComments = async() => {

        try{
            const data = await getDocs(query(commentsList, orderBy('postDate', 'desc')))

            const rawData = data.docs.map( (doc) => ({...doc.data(), id: doc.id }))
            
            setCommentList(rawData)

        } catch(err){
            console.error(err);
        }
    }

    const deleteComm = async(id, author) => {
        const commentDoc = doc(db, "comments", id)
        
        
        if (window.confirm("Delete?")) {
            try{
                await deleteDoc(commentDoc)
                getComments()
            } catch (err) {
                console.error(err);
            }
        }
        
        
    }


    useEffect( () => {
        const getComments = async() => {

            try{
                const data = await getDocs(query(commentsList, orderBy('postDate', 'desc')))
    
                const rawData = data.docs.map( (doc) => ({...doc.data(), id: doc.id }))
                
                setCommentList(rawData)
    
            } catch(err){
                console.error(err);
            }
        }
        getComments()
    }, [commentsList])

    const createComment = async () => {
        const authorComm = auth?.currentUser?.email
        const timestamp = Timestamp.fromDate( new Date())
        const commentInput = document.getElementById('commentInput')
        
        if (commentInput.value === ''){
            alert('Cannot post empty comment.')
            return
        } 

        try{
            await addDoc(commentsList, { 
                author: authorComm, 
                body: newCommentBody, 
                postDate: timestamp, })
                
            setNewCommentBody('')
            commentInput.value = ''
            getComments()
            
        } catch(err){
            console.error(err);
        }
        
    }

    const getAuthor = (author) => {
        let splited = author.split('@')
        let authorRedo = splited[0]
        return authorRedo
    }

   

    return (
        
        <div className='comments-body'>
            
            <div className='create-comment'>
                
                   <input 
                    type="text" 
                    placeholder='Comment on this app...' 
                    id='commentInput'
                    onChange={ (event) => setNewCommentBody(event.target.value)}
                    />
                
                    <button className='button-add' onClick={createComment} >Add comment</button>
                
                
            </div>
            <div>
                <h2>Comments</h2>
            </div>

            
                {commentList.map( (post) => {
                return(
                    <div key={post.id} className='oneComment'>
                        <div className='comment-wrap'>
                            <div className='userFoto'>
                                <FaRegUserCircle size={40} className='icon-user' strokeWidth={0}/>
                            </div>
                            <div className="post">
                                <div className="post-info">
                                    <div className="post-info-up">
                                        {/* <p className='name'>@{post.author}</p> */}
                                        <p className='name'>@{getAuthor(post.author)}</p>
                                        <p className='post-body'>{post.body}</p>
                                    </div>
                                    <div className="post-info-down">
                                        <p className='post-date'>Posted: {post.postDate.toDate().toDateString()}</p>
                                        {auth.currentUser.email === post.author && <button title="Delete comment" className='butt-del' onClick={() => {deleteComm(post.id, post.author)}}><ImBin className='del-icon' size={15}/></button>}
                                        {/* <button onClick={() => {deleteComm(post.id, post.author)}} id='deleteBut'>Delete my post</button> */}
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                )
                })}

                {data.map( (comm) => {
                    const{id, body, author, postDate} = comm
                    return(
                        <div key={id} className='oneComment'>
                            <div className='comment-wrap'>
                                <div className='userFoto'>
                                    <FaRegUserCircle size={40} className='icon-user' strokeWidth={0}/>
                                </div>
                                <div className='post'>
                                    <div className='post-info'>
                                        <div className='post-info-up'>
                                            <p className='name'>@{author}</p>
                                            <p className='post-body'>{body}</p>
                                        </div>
                                        <div className='post-info-down'>
                                            <p className='post-date'>Posted: {postDate}</p>
                                            <button title="Delete comment" className='butt-del'><ImBin className='del-icon' size={15}/></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
        </div> 

                
                
                
                
            
        
    )
}

export default Comment