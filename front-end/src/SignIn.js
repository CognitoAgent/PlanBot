import { useState } from 'react';
import './FormStyle.css';
function SignInHeader(){
    return(
    <div className="header">
    <h3>Sign in</h3>
    <div>Sign in to your account</div>
    </div>
    );
}
function Form(){
    const [inputs, setInputs]=useState({})
    function handleChange(e){
        const name=e.target.name;
        const value=e.target.value;
        setInputs({...inputs, [name]:value});
    }
    function handleEnter(e){
        if(e.target.name==="email"){
            document.getElementsByName('password')[0].focus();
        }
        if(e.target.name==="password"){
            // To je isto kao i pritisak na Sign in
        }

    }
    return (
        <div className="form">
        <label>
            Email:<br/>
            <input 
                type="email"
                name="email"
                className='formElement'
                placeholder='m@example.com'
                value={inputs.email}
                onChange={handleChange}
                onKeyDown={(e)=>{if(e.key==="Enter")handleEnter(e)}}
            />
        </label>
        <label>
            Password:<br/>
            <input 
                type="password"
                name="password"
                className='formElement'
            
                value={inputs.password}
                onChange={handleChange}
            />
        </label>
        <input type="submit" value="Sign in" className="submitButton formElement"/>
        </div>
    );
}
function Footer(){
    let question="Don't have an account? ";
    return (
        <div className='footer'>
            {question}<a href="">Register</a>
        </div>
    );
}
function SignIn(){
    return(
        <div className='all'>
        <SignInHeader/>
        <Form/>
        <Footer />
        </div>
    );
}
export default SignIn;