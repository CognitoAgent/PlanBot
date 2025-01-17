import Button from './EventComponents/Button'
function Propositions(){
    let i;
    let message=[];
    /*
    let propositions=JSON.parse(sessionStorage.getItem('propositions'));
    let comments=JSON.parse(sessionStorage.getItem('comments'));
    sessionStorage.removeItem('propositions');
    sessionStorage.removeItem('comments');
    */
    let propositions=[{date:"datum", location:"lokacija"},{date:"datum", location:"lokacija"},{date:"datum", location:"lokacija"}]
    let comments=["Ovo je komentar ","Ovo je komentar ","Ovo je komentar ","Ovo je komentar "]
    for(i=0;i<propositions.length;i++){
         message[i]=(i+1)+"."+" proposition is:\n"+"Date: "+propositions[i].date+"\n"+ 
        "Location: "+propositions[i].location;
    }
        

   propositions=propositions.map(m=> <p>{m}</p>);
    return <div>
        <h1>Propositions and comments</h1>
        <div style={{
        display:"flex",
    }}>
        <div style={{
            width:"50%",
        }}>
            <h3>Propositions</h3>
            <div>{message}</div>
        </div>
        <div style={{
            width:"50%",
            
        }}>
            <h3>Comments</h3>
            <div>{comments}</div>
        </div>
        </div>
        <Button text="Event list" onClick={()=>window.location.replace("eventlist")}/>
        </div>
}
export default Propositions;