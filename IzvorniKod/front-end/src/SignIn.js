import { useState } from 'react';
import FormElement from './components/FormElement';
import FormHeader from './components/FormHeader';
import FormFooter from './components/FormFooter';

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
            fetch('http://52.213.213.5:8080/login', {
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
                    window.location.replace('http://52.213.213.5:8080/AdminPanel');
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
                padding: "0%",
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
    return (
        <div
            className="all"
            style={{
                height: "300px",
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
            <FormFooter question="Don't have an account? " href="/Register" link="Register" />
        </div>
    );
}

export default SignIn;