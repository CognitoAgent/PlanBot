import { useState } from 'react';
import FormHeader from './components/FormHeader';
import FormFooter from './components/FormFooter';
import FormElement from './components/FormElement';
import './FormStyle.css';
function Form(){
    const [inputs, setInputs]=useState({})
    function handleChange(e){
        const name=e.target.name;
        const value=e.target.value;
        setInputs({...inputs, [name]:value});
    }
    function handleEnter(e){
        if(e.target.name==="username"){
            document.getElementsByName('Email')[0].focus();
        }
        if(e.target.name==="Email"){
            document.getElementsByName('Password')[0].focus();
        }
        if(e.target.name==="Password"){
            document.getElementsByName('Confirm Password')[0].focus();
        }
        if(e.target.name==="Confirm Password"){
            // To je isto kao i pritisak na Sign in
        }

    }
    function handleSubmit(){
        fetch('http://localHost:8080/register',{method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),})
         .then(response => {
        if (response.ok) {
            window.location.replace('http://localhost:3000/AdminPanel');
                
            }
            throw new Error("Register failed");
        })
        .catch(er => alert(er.message));
    }
    return (
        <form className="form" onSubmit = {handleSubmit} style={{
            padding: "0%",
            display: "flex",
            flexDirection:" column",
            justifyContent: "space-between",
            width:"100%",
            marginTop:"20px",
            height:"400px"
        }}>
         <FormElement  type="text" name="username" display="User name" value={inputs.username}
          onChange={handleChange}onKeyDown={(e)=>{if(e.key==="Enter")handleEnter(e)}} />

         <FormElement  type="email" name="Email" placeHolder="m@example.com" value={inputs.Email}
          onChange={handleChange}onKeyDown={(e)=>{if(e.key==="Enter")handleEnter(e)}} />

        <FormElement  type="password" name="Password" value={inputs.Password}
          onChange={handleChange}onKeyDown={(e)=>{if(e.key==="Enter")handleEnter(e)}} />

        <FormElement  type="password" name="Confirm Password"  value={inputs["Confirm Password"]}
          onChange={handleChange}onKeyDown={(e)=>{if(e.key==="Enter")handleEnter(e)}} />
        
        <input type="submit" value="Register" className="submitButton formElement"
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
function Register(){
    return(
        <div className='all'
        style={{
            height:"510px", width:"300px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "2%",
            
            border: "1px solid black",
            borderRadius: "4px",
           backgroundColor: "white",
        }}
        >
        <FormHeader heading="Register" text="Create your account"/>
        <Form/>
        <FormFooter question="Already have an account? " href="/SignIn" link="Sign in"/>
        </div>
    );
}
export default Register;