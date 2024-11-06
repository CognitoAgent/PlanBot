function FormHeader({heading, text}){
    return(
        <div style={{

        }}>
        <h3 style={{marginBottom:"5px"}}>{heading}</h3>
        <div style={{ fontSize: "small",color: "grey"}}>{text}</div>
        </div>
    );
}

export default FormHeader;