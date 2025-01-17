import Button from './EventComponents/Button'
function Propositions(){
    let i;
    let message=[];
    let propositions=JSON.parse(sessionStorage.getItem('propositions'));
    let comments=JSON.parse(sessionStorage.getItem('comments'));
    sessionStorage.removeItem('propositions');
    sessionStorage.removeItem('comments');
    for(i=0;i<propositions.length;i++){
         message[i]=(i+1)+"."+" proposition is:\n"+"Date: "+propositions[i].date+"\n"+ 
        "Location: "+propositions[i].location;
    }
   message=message.map(m=> <p>{m}</p>)
    return <div>
        <h1>Propositions and comments</h1>
        <div style={{
            width:"50%",
        }}>
            <h3>Propositions</h3>
            <div>{message}</div>
        </div>
        <Button text="Event list" onClick={()=>window.location.replace("eventlist")}/>
        </div>
}
export default Propositions;