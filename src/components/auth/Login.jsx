import React, { useState } from 'react'
import { loginUser } from '../utils/ApiFunctions'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode';

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleInputChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    /* const handleLogin = (e) => {
         e.preventDefault()
         const success = await loginUser(login)
         if (success) {
             const token = success.token
             const decodedToken = jwtDecode(token)
             localStorage.setItem("token", token)
             localStorage.setItem("userId", decodedToken.sub)
             localStorage.setItem("userRple", decodedToken.roles.join(","))
             navigate("/")
             window.location.reload()
         }else{
             setErrorMessage("Invalid username or password. Please try again.")
         }
         setTimeout(() => {
             setErrorMessage("")
         }, 4000)
 
     }*/

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const success = await loginUser(login); // login should be an object like { email, password }

            if (success && success.token) {
                const token = success.token;
                const decodedToken = jwtDecode(token);

                localStorage.setItem("token", token);
                localStorage.setItem("userId", decodedToken.sub); // Make sure "sub" exists
                localStorage.setItem("userRole", decodedToken.roles.join(","));

                navigate("/"); // Go to homepage or dashboard
                window.location.reload();
            } else {
                setErrorMessage("Invalid username or password. Please try again.");
                setTimeout(() => setErrorMessage(""), 4000);
            }
        } catch (error) {
            console.error("Login failed:", error);
            setErrorMessage("Something went wrong. Please try again.");
            setTimeout(() => setErrorMessage(""), 4000);
        }
    };

    return (
        <section className='container col-6 mt-5 mb-5'>
            {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                 <div className='row mb-3'>
                    <label htmlFor='email' className='col-sm-2 col-form-label'>Email</label>
                    <div>
                        <input
                        id='email'
                        name='email'
                        type='email'
                        className='form-control'
                        value={login.email}
                        onChange={handleInputChange}
                        />
                        
                    </div>
                 </div>

                 <div className='row mb-3'>
                    <label htmlFor='password' className='col-sm-2 col-form-label'>Password</label>
                    <div>
                        <input
                        id='password'
                        name='password'
                        type='password'
                        className='form-control'
                        value={login.password}
                        onChange={handleInputChange}
                        />
                        
                    </div>
                 </div>

                 <div className='mb-3'>
                    <button 
                    type='submit' 
                    className='btn btn-hotel'
                    style={{marginRight : "10px"}}

                    >
                      Login
                    </button>
                    <span style={{marginLeft : "10px"}}>Don't have an account yet? <Link to={"/register"}></Link> </span>
                 </div>
            </form>
        </section>
    )
}

export default Login
