import { response } from 'express';
import Button from './EventComponents/Button'
function checkForAdmin(adresa){
    const token=sessionStorage.getItem('token');
    if(token===null){
        window.location.replace('login');
    }
    fetch(
        "https://ec2-52-30-64-126.eu-west-1.compute.amazonaws.com:8443/admin",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      )
      .then(response=>{
        if(response.ok){
            window.location.replace('adminview');
        }
        else{
            if(response.status===400){
                alert("You are not an admin");
                window.location.replace(adresa);
            }
            else{
                throw new Error("Something went wrong");
            }
        }
      })
      .catch(e=>alert(e.message));
}
function newProposition(event) {
    sessionStorage.setItem("event", JSON.stringify(event));
    window.location.replace("proposechange");
  }
  function newComment(event){
    sessionStorage.setItem("event", JSON.stringify(event));
    window.location.replace("newcomment");
  }

function Propositions(){
    let event=JSON.parse(sessionStorage.getItem('event'));
    let i;
 
    let propositionsd=JSON.parse(sessionStorage.getItem('propositions'));
     let commentsd=JSON.parse(sessionStorage.getItem('comments'));
     let propositions=[];
     let comments=[];
     for( i=0;i<propositionsd.length;i++){
        let p={};
        p.date=propositionsd[i].date;
        p.location=propositionsd[i].location;
        p.key=i;
        propositions.push(p);
     }
     for(i=0;i<commentsd.length;i++){
        let p=commentsd[i].text;
        comments.push(p);
     }
     if(comments==null){
        comments=["No comments"];
     }
    
    sessionStorage.removeItem('propositions');
    sessionStorage.removeItem('comments');

    for(i=0;i<propositions.length;i++){
         propositions[i]=<div><p>{i+1}. proposition is:</p>
         <p>Date: {propositions[i].date}</p>
        <p>Location:{propositions[i].location}</p></div>
    }
    comments=comments.map(c => <p>{c}</p>)
 //propositions=propositions.map(p => <div key={p.key}>{p.location}</div>)
    return <div>
        
        <h1>Propositions and comments</h1>
        <Button text="Event list" onClick={()=>window.location.replace("eventlist")}/>
        <Button text="New Event" onClick={()=>window.location.replace("adminpanel")}/>
        <Button text="Admin View" onClick={()=>checkForAdmin('propositions')}/>
        <div style={{
        display:"flex",
    }}>
        <div style={{
            width:"50%",
        }}>
            <h3>Propositions</h3>
            <div>{propositions}</div>
            <Button text="New Proposition" onClick={()=>newProposition(event)}/>
        </div>
        <div style={{
            width:"50%",
            
        }}>
            <h3>Comments</h3>
            <div>{comments}</div>
            <Button text="New Comment" onClick={()=>newComment(event)} />
        </div>
        </div>
        </div>
}
export default Propositions;