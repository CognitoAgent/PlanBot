import Button from './EventComponents/Button'
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
 
    let propositions=JSON.parse(sessionStorage.getItem('propositions'));
     let comments=JSON.parse(sessionStorage.getItem('comments'));
     if(comments==null){
        comments=["No comments"];
     }

    
    /*
    sessionStorage.removeItem('propositions');
    sessionStorage.removeItem('comments');
    */
    //propositions=[{date:"datum", location:"lokacija"},{date:"datum", location:"lokacija"},{date:"datum", location:"lokacija"}]
     //comments=["Ovo je komentar ","Ovo je komentar ","Ovo je komentar ","Ovo je komentar "]
    
   if(propositions!=null){
    for(i=0;i<propositions.length;i++){
         propositions[i]=<div><p>{i+1}. proposition is:</p>
         <p>Date: {propositions[i].date}</p>
        <p>Location:{propositions[i].location}</p></div>
    }
        
}
if(propositions==null){
    propositions=["No propositions"];
 }
    return <div>
        
        <h1>Propositions and comments</h1>
        <Button text="Event list" onClick={()=>window.location.replace("eventlist")}/>
        <Button text="New Event" onClick={()=>window.location.replace("adminpanel")}/>
        <Button text="Admin View" onClick={()=>window.location.replace("adminview")}/>
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