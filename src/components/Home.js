import { signOut } from 'firebase/auth'
import { auth } from '../configuration/firebase'
import Comment from './Comment'
import { RiReactjsFill } from 'react-icons/ri';
import { SiFirebase } from 'react-icons/si';
import { FaRegUserCircle } from 'react-icons/fa';
import './Home.css'

const logOut = async () => {
    try{
        await signOut(auth)
    } catch (err) {
        console.error(err);
    }
}



const Home = () => {


    const getUser = () => {
        try{
            let userEmail = auth.currentUser.email
            let splitUser = userEmail.split("@")
            let user = splitUser[0]
            return user
        } catch(err){
            console.log(err);
        }
    }

    return(
        <div className='body-home'>
            <div className='header-body'>
                <div className='logos'>
                    <RiReactjsFill size={80} className='icon'/>
                    <SiFirebase size={80} className='icon'/>
                </div>
                <div className='user-info'>
                    <div className='profile'>
                        <FaRegUserCircle size={40} className='icon-user' strokeWidth={0}/>
                        <p>{getUser()}</p>
                        <button onClick={logOut}>Logout</button>
                    </div>
                    
                </div>
                
            </div>
            
            <div className='space'></div>

            
            <Comment/>
            
        </div>
    )
}

export default Home