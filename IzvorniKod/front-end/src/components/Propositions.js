
function Propositions(){
    let i;
    let message=[];
    let propositions=JSON.parse(sessionStorage.getItem('propositions'));
    sessionStorage.removeItem('propositions');
    for(i=0;i<propositions.length;i++){
         message[i]=(i+1)+"."+" proposition is:\n"+"Date: "+propositions[i].date+"\n"+ 
        "Location: "+propositions[i].location;
    }
   message=message.map(m=> <p>{m}</p>)
    return <div>{message}</div>
}
export default Propositions;