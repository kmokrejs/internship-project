import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect} from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth2";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../configuration/firebase'
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import './Login.css'

const Login = ({ history }) => {

  const [checked, setChecked] = useState(false); 

  

    const loginHandler = useCallback(
        async event => {
          event.preventDefault();
          let { email, password } = event.target.elements;
          email = email.value + '@myapp.com'
          
          try {
            await signInWithEmailAndPassword(auth, email, password.value);
            history.push("/");
          } catch (error) {
            alert(error);
          }
        },
        [history]
    );

    const handleChange = () => { 
      setChecked(!checked);  
    };


    const togglePass = () => {
      let inputPass = document.getElementById('password')
      if (inputPass.type === 'password') {
        inputPass.type = 'text'
        handleChange()
      } else {
        inputPass.type = 'password'
        handleChange()
      }
    }

    

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />;
    }

    return(
        <div  className="log-in">
            <div className="header">
              <div className="header-text">
                <h1><span>Lo</span>gin</h1>
              </div>
            </div>
            
            <form onSubmit={loginHandler}>
                <div className="inputs-field-user">
                  <FaUser size={20} />
                  <input name="email" type="text" placeholder="Enter your username" />
                  
                </div>
                
                <div className="inputs-field-pass">
                  <RiLockPasswordFill size={20} />
                  <input name="password" type="password" id="password" placeholder="Enter your password" />
                  
                </div>

                <div className="show-pass">
                  
                  <div className="show-check">
                    <input type="checkbox" onClick={togglePass}/>
                  </div>
                  <div className="text">
                    <p>{checked ? 'Hide password' : 'Show password'}</p>
                  </div>
                  
                </div>
                

                <button type="submit">Login Now</button>
            </form>

            <p>Doesn't have an account? <Link to="/register">Signup now</Link></p>
      </div>
    )
}

export default withRouter(Login)