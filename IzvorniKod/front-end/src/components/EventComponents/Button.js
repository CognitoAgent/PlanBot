function Button({text, onClick, style}){
    return(
     <button onClick={onClick} style={{...style, borderRadius:"4px",border:"1px solid #002d6e", backgroundColor: "#002d6e", color:"white",paddingLeft:"15px",paddingRight:"15px",height: "40px", fontSize:"medium"}}>
        {text}
    </button>
)};
export default Button;
