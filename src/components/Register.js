import React, { useCallback, useState } from "react";
import { auth } from '../configuration/firebase'
import { Link } from "react-router-dom"
import { withRouter } from "react-router";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import './Register.css'

const Register = ({ history }) => {

  const [checked, setChecked] = useState(false); 

    const registrationHandler = useCallback(async event => {
        event.preventDefault(); // prevent reloading page when sign up button is clicked
        let { email, password, passwordConf } = event.target.elements;
        email = email.value + '@myapp.com'
        

        if (password.value === passwordConf.value){
          try {
            await createUserWithEmailAndPassword(auth, email, password.value);
            history.push("/");  // redirects to rooth path
          } catch (error) {
            alert(error);
          }
        } else {
          alert('Passwords have to match!')
        }
        
      }, [history]);


      const handleChange = () => { 
        setChecked(!checked);  
      };
  
  
      const togglePass = () => {
        let inputPass = document.getElementById('password')
        let inputPass2 = document.getElementById('password2')
        if (inputPass.type === 'password') {
          inputPass.type = 'text'
          inputPass2.type = 'text'
          handleChange()
        } else {
          inputPass.type = 'password'
          inputPass2.type = 'password'
          handleChange()
        }
      }

    return(
        <div className="register">
            <div className="header">
              <div className="header-text">
                <h1><span>Re</span>gistration</h1>
              </div>
            </div>

                <form onSubmit={registrationHandler}>
                  <div className="inputs-field-user">
                    <FaUser/>
                    <input name="email" type="text" placeholder="Create username" />
                    
                  </div>

                  <div className="inputs-field-pass">
                    <RiLockPasswordFill/>
                    <input name="password" type="password" id="password" placeholder="Create a password" />
                  
                  </div>

                  <div className="inputs-field-pass">
                    <RiLockPasswordFill/>
                    <input name="passwordConf" type="password" id="password2" placeholder="Confirm a password" />
                  
                  </div>

                  <div className="show-pass">
                  
                    <div className="show-check">
                      <input type="checkbox" onClick={togglePass}/>
                    </div>
                    <div className="text">
                      <p>{checked ? 'Hide password' : 'Show password'}</p>
                    </div>
                  </div>

                    <button type="submit">Sign Up</button>
                </form>
                <p>Already have account?<Link to="/login"> Log in</Link></p>
      </div>
    )
}

export default withRouter(Register);