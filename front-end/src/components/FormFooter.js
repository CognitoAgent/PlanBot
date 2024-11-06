function FormFooter({question, href, link}){
    return (
        <div style={{marginTop:"5%", textAlign:"center"}}>
            {question} <a href={href}>{link}</a>
        </div>
    );
}


export default FormFooter;