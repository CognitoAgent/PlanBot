import { useState, useContext } from 'react';
import FormElement from './components/FormElement';
import FormHeader from './components/FormHeader';
import FormFooter from './components/FormFooter';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { AppStateContext } from './src/AppStateProvider';

import './FormStyle.css';

function Form() {
    // Initialize inputs with default values
    const [inputs, setInputs] = useState({
        username: "", // Default to empty string for controlled behavior
        password: "",
    });

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setInputs({ ...inputs, [name]: value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!inputs.username.trim()) {
            alert('Please enter user name');
            document.getElementsByName('username')[0].focus();
        } else if (!inputs.password.trim()) {
            alert('Please enter password');
            document.getElementsByName('password')[0].focus();
        } else {
            fetch('https://ec2-52-30-64-126.eu-west-1.compute.amazonaws.com:8443/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors',
                body: JSON.stringify(inputs),
            })
                .then(response => {
                    if (response.ok) {
                        return response.text();
                    } else {
                        throw new Error("Login failed");
                    }
                })
                .then(text => {
                    if (!text.trim()) {
                        throw new Error("Response body is empty");
                    }
                    return text;
                })
                .then(text => {
                    sessionStorage.setItem('token', text);
                    window.location.replace('https://planbot-9s64.onrender.com/adminpanel')
                })
                .catch(error => alert(error.message));
                
        }
             
    }
    
    return (

        
        <form
            className="form"
            onSubmit={handleSubmit}
            onKeyDown={(e) => { if (e.key === "Enter") return; }}
            style={{
                paddingBottom: "2%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
                marginTop: "20px",
                height: "200px",
            }}
        >
            <FormElement
                type="text"
                name="username"
                display="User name"
                placeholder="Username"
                value={inputs.username} // Always use controlled value
                onChange={handleChange}
            />
            <FormElement
                type="password"
                name="password"
                display="Password"
                placeholder="Password"
                value={inputs.password} // Always use controlled value
                onChange={handleChange}
            />
            <input
                type="submit"
                value="Sign in"
                className="submitButton formElement"
                style={{
                    boxSizing: "border-box",
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "block",
                    paddingLeft: "5px",
                    borderRadius: "4px",
                    width: "100%",
                    height: "35px",
                    border: "1px solid black",
                    backgroundColor: "black",
                    color: "white",
                }}
            />
        </form>
    );
}

function SignIn() {

    const { setUser } = useContext(AppStateContext);

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            const token = credentialResponse.credential;
            console.log("Google Token:", token);
            const response = await axios.post('https://ec2-52-30-64-126.eu-west-1.compute.amazonaws.com:8443/login', token, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });

            if (response.status === 200) {
                console.log('User already registered!');
                setUser(response.data);
                console.log(response.data);
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                console.log('User not found, creating a new user.');
                setUser(error.response.data);
            } else {
                console.error('Failed to send token ID to the backend', error);
            }
        }
    };

    return (
        <div style={{
            backgroundColor: "whitesmoke",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height:"100vh",
            width:"100vw"
        }}
        >
        <div
            className="all"
            style={{
                minHeight: "300px",
                width: "250px",
                marginLeft: "auto",
                marginRight: "auto",
                padding: "2%",
                border: "1px solid black",
                borderRadius: "4px",
                backgroundColor: "white",
            }}
        >
            <FormHeader heading="Sign in" text="Sign in to your account" />
            <Form />
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={() => console.log("Google login failed")}
                    />
                </div>
            <FormFooter question="Don't have an account? " href="/Register" link="Register" />
        </div>
        </div>
    );
}

export default SignIn;
