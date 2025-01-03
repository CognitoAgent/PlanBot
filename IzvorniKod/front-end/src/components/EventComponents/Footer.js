import Button from './Button';
function Footer(){
    return (
        <div style={{display:"flex",justifyContent:"space-between" ,width:"100%"}}>
            <Button text="Accept"/>
            <Button text="Decline"/>
            <Button text="Change"/>
        </div>
    )
};
export default Footer;