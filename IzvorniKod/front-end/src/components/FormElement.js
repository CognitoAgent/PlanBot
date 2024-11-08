function FormElement({ type, name, value, onChange, onKeyDown, placeHolder, display, style }) {
    if (display === undefined) display = name;

    return (<label style={{
        display: "block"
    }}>
        {display}:
        <input
            style={{
                marginTop: "6px",
                boxSizing: "border-box",
                marginLeft: (style && style.marginLeft) || "auto",
                marginRight: "auto",
                display: "block",
                paddingLeft: "5px",
                borderRadius: "4px",
                width: (style && style.width) || "98%",
                height: (style && style.height) || "35px",
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