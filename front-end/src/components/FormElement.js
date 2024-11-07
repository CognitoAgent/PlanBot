function FormElement({type,name,value,onChange,onKeyDown,placeHolder,display}){
    if(display===null) display=name;
    return (<label style={{
        display:"block"
    }}>
        {display}:
        <input
            style={{
                marginTop: "2%",
                boxSizing: "border-box",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
                paddingLeft: "5px",
                borderRadius: "4px",
                width:"94%" ,
                height: "35px",
                border: "1px solid black"
            }}
            type={type}
            name={name} 
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeHolder={placeHolder}
        />
    </label>
    );
}
export default FormElement;