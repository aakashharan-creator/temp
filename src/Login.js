import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, useGoogleLogin, GoogleLogin } from '@react-oauth/google';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

import NavBar from "./components/universal/NavBar";

const navItems = [
    { navItemName: "Home", route: "/" },
    { navItemName: "Menu", route: "/menu" },
    { navItemName: "Find", route: "/find" }
];

/**
 * method to check login credentials
 * @method
 * @param navigate - method to redirect
 * @param {string} email - email of user
 * * @param {string} password - password of user
 * @author @AakashHaran
 */
// const tryLogin = async (navigate, email, password) => {
//     const getItemsAPI = "http://localhost:5001/login";
//     console.log("TRYING LOGIN", email, password)

//     // const test = await fetch(getItemsAPI,
//     //     {
//     //         method: "POST",
//     //         mode: "cors",
//     //         cache: "no-cache",
//     //         headers: {
//     //             "Content-Type": "application/json"
//     //         },
//     //         body: JSON.stringify({
//     //             "email": email,
//     //             "password": password
//     //         })
//     //     }
//     // ).then((response) => {console.log(response.json())})

//     axios.post(getItemsAPI,
//         {
//             "email": email,
//             "password": password
//         }
//     ).then(response => console.log(response.data));
// }

const tryLogin = async (navigate, email, password) => {
    const loginAPI = `https://pos-03l8.onrender.com/login/?email=${email}&password=${password}`;

    await fetch(loginAPI)
        .then((response) => response.json())
        .then((data) => 
        {
            if (data.role === "manager") {
                sessionStorage.setItem("role", "manager");
                navigate("/manager");
            } else if (data.role === "server") {
                sessionStorage.setItem("role", "server");
                navigate("/server")
            } else {
                alert("Invalid credentials.")
            }
        }
        );
}

/**
 * react component for login page
 * @function
 * @author @AakashHaran
 */
const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    return (
        <>
            <NavBar navItems={navItems} isCustomer={false} cart={props.cart} home={"/"} />
            <div className='form-container' style={{ width: '50%', position: "absolute", top: "12%", left: "50%", transform: "translate(-50%, 50%)" }}>
                <GoogleOAuthProvider clientId="243604614412-hdjn1eb24blri85d9apimi9tts2pe15u.apps.googleusercontent.com">
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            sessionStorage.setItem("role", "manager");
                            navigate('/server');
                            // TODO: make sure to change based on who logged in
                            console.log(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        text={"Sign in with Google"}
                        shape={"pill"}
                        theme={'filled_blue'}
                        width={"500"}
                        size={"large"}
                    />
                </GoogleOAuthProvider>
                <div style={{ marginTop: '3%', padding: '5%', boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email Address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" class="form-text">Enter your employee assigned Chick-Fil-A email</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <button class="btn btn-primary btn-lg" style={{ backgroundColor: '#e60e33', border: 'none' }} onClick={() => { tryLogin(navigate, email, password) }}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;