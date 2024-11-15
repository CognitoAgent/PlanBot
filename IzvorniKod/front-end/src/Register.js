import { useState } from 'react';
import FormHeader from './components/FormHeader';
import FormFooter from './components/FormFooter';
import FormElement from './components/FormElement';
import './FormStyle.css';
function Form() {
    const [inputs, setInputs] = useState({})
    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setInputs({ ...inputs, [name]: value });
    }

    function handleSubmit(e) {

        e.preventDefault();
        if (inputs.username === '' || inputs.username === undefined || inputs.username === null) {
            alert('Please enter user name');
            document.getElementsByName('username')[0].focus();
        }
        else if (inputs.emailAddress === '' || inputs.emailAddress === undefined || inputs.emailAddress === null) {
            alert('Please enter email address');
            document.getElementsByName('emailAddress')[0].focus();
        }
        else if (inputs.password === '' || inputs.password === undefined || inputs.password === null) {
            alert('Please enter password');
            document.getElementsByName('password')[0].focus();
        }
        else if (inputs.ConfirmPassword === '' || inputs.ConfirmPassword === undefined || inputs.ConfirmPassword === null) {
            alert('Please confirm password');
            document.getElementsByName('ConfirmPassword')[0].focus();
        }
        else if (inputs.password !== inputs.ConfirmPassword) {
            alert("Passwords are not matching");
            setInputs({ ...inputs, password: '', ConfirmPassword: '' });
            document.getElementsByName('password')[0].focus();
        }
        else {
            fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputs),
            })
                .then(response => {
                    if (response.ok) {
                        return response.text();

                    } else {

                        throw new Error("Registration failed");

                    }
                })
                .then(text => {
                    if (text === '') {
                        throw new Error("Response body is empty");
                    }
                    return text;
                })
                .then(text => {
                    sessionStorage.setItem('token', text);
                    window.location.replace('AdminPanel');
                })
                .catch(er => alert(er.message));
        }
    }
    return (
        <form className="form" onSubmit={handleSubmit} style={{
            padding: "0%",
            display: "flex",
            flexDirection: " column",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "20px",
            height: "400px"
        }}>
            <FormElement type="text" name="username" display="User name" value={inputs.username}
                onChange={handleChange} />

            <FormElement type="email" name="emailAddress" display="email address" placeholder="m@example.com" value={inputs.emailAddress}
                onChange={handleChange} />

            <FormElement type="password" name="password" display="Password" value={inputs.password}
                onChange={handleChange} />

            <FormElement type="password" name="ConfirmPassword" display="Confirm password" value={inputs.ConfirmPassword}
                onChange={handleChange} />

            <input type="submit" value="Register" className="submitButton formElement"
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
                    color: "white"
                }}
            />
        </form>
    );
}
function Register() {
    return (
        <div className='all'
            style={{
                height: "510px", width: "300px",
                marginLeft: "auto",
                marginRight: "auto",
                padding: "2%",

                border: "1px solid black",
                borderRadius: "4px",
                backgroundColor: "white",
            }}
        >
            <FormHeader heading="Register" text="Create your account" />
            <Form />
            <FormFooter question="Already have an account? " href="/SignIn" link="Sign in" />
        </div>
    );
}
export default Register;