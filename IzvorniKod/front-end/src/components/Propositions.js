
import Button from './EventComponents/Button'
import checkForAdmin from './checkForAdmin';
function newProposition(event) {
    sessionStorage.setItem("event", JSON.stringify(event));
    window.location.replace("proposechange");
  }
  function newComment(event){
    sessionStorage.setItem("event", JSON.stringify(event));
    window.location.replace("newcomment");
  }

function Propositions(){
    const token = sessionStorage.getItem("token");
        
    if(token===null){
        window.location.replace('/login');
    }
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
         propositions[i]= (
        <div
            key={i}
            style={{
                border: "1px solid black",
                padding: "10px", 
                marginBottom: "10px", 
                borderRadius: "5px", 
            }}
        >
            <p>{i+1}. proposition is:</p>
            <p>Date: {propositions[i].date}</p>
            <p>Location: {propositions[i].location}</p>
        </div>
        );
    }
    comments = comments.map((c, index) => (
        <p key={index} style={{ marginBottom: "10px" }}>{c}</p>
    ));

    //comments=comments.map(c => <p>{c}</p>)
    //propositions=propositions.map(p => <div key={p.key}>{p.location}</div>)

    return (
        <div style={{ padding: "20px" }}>
            <h1>Propositions and comments</h1>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <Button text="Event list" onClick={()=>window.location.replace("eventlist")}/>
                <Button text="New Event" onClick={()=>window.location.replace("adminpanel")}/>
                <Button text="Admin View" onClick={()=>checkForAdmin()}/>
            </div>

            <div style={{ display:"flex" }}>
                <div style={{
                    width:"50%",
                    padding: "10px",
                    marginLeft: "10px",
                }}>
                    <h3>Propositions</h3>
                    <div>{propositions}</div>
                    <Button text="New Proposition" onClick={()=>newProposition(event)}/>
                </div>

                <div style={{
                    width:"50%",
                    padding: "10px",
                }}>
                    <h3>Comments</h3>
                    <div>{comments}</div>
                    <Button text="New Comment" onClick={()=>newComment(event)} />
                </div>
                </div>
                </div>
            );
        }
        export default Propositions;