import { useState } from 'react';
import FormElement from './components/FormElement';
import FormHeader from './components/FormHeader'
import FormFooter from './components/FormFooter';

import './FormStyle.css';
function Form(){
    const [inputs, setInputs]=useState({})
    function handleChange(e){
        const name=e.target.name;
        const value=e.target.value;
        setInputs({...inputs, [name]:value});
    }
    function handleEnter(e){
        if(e.target.name==="Email"){
            document.getElementsByName('Password')[0].focus();
        }
        if(e.target.name==="Password"){
            // To je isto kao i pritisak na Sign in
        }

    }
    function handleSubmit(){
        fetch('localhost:8080/login',{method:'POST', body:JSON.stringify(inputs)} )
        .then(alert("Uspješan Sign In"))
        .catch(alert("Neuspješan Sign in"));
    }
    return (
        <form className="form" onSubmit ={handleSubmit} style={{
            padding: "0%",
            display: "flex",
            flexDirection:" column",
            justifyContent: "space-between",
            width:"100%",
            marginTop:"20px",
            height:"200px"}}>
            <FormElement type="email" name="Email" placeHolder='m@example.com' value={inputs.Email} onChange={handleChange}
             onKeyDown={(e)=>{if(e.key==="Enter")handleEnter(e)}}/>
        <FormElement type="password" name="Password" value={inputs.Password}
         onChange={handleChange}  onKeyDown={(e)=>{if(e.key==="Enter")handleEnter(e)}}/>
        <input type="submit" value="Sign in" className="submitButton formElement"
            style={{  
                boxSizing: "border-box",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
                paddingLeft: "5px",
                borderRadius: "4px",
                width:"100%" ,
                height: "35px",
                border: "1px solid black",
                backgroundColor: "black",
                 color:"white"
                }}
        />
        </form>
    );
}
function SignIn(){
    return(
        <div className='all' style={{
            height:"300px", width:"250px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "2%",
            border: "1px solid black",
            borderRadius: "4px",
           backgroundColor: "white",
        }}>
        <FormHeader heading="Sign in" text="Sign in to your account"/>
        <Form/>
        <FormFooter question="Don't have an account? " href="/Register" link="Register"/>
        </div>
    );
}
export default SignIn;