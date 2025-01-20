function Button({text, onClick, style}){
    return(
     <button onClick={onClick} style={{...style, borderRadius:"4px", backgroundColor: "black", color:"white",paddingLeft:"15px",paddingRight:"15px",height: "40px", fontSize:"medium"}}>
        {text}
    </button>
)};
export default Button;
