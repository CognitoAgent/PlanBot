function Button({text, onClick}){
    return(
     <button onClick={onClick} style={{ borderRadius:"4px", backgroundColor:"black", color:"white",paddingLeft:"15px",paddingRight:"15px",height: "40px", fontSize:"medium"}}>
        {text}
    </button>
)};
export default Button;