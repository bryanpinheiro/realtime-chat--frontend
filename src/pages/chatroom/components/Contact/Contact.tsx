import "./Contact.css";

export default function Contact(props: any) {
    return (
        <div data-testid="contact" className={`contactBg ${props.isSelected}`} onClick={props.onSelect}>
            <div className="contactAvatar">
            </div>
            <div className="contactInfo">
                <div className="contactName"> {props.username} </div>
                <div className={`contactStatus ${props.status}`}> {props.status} </div>
            </div>
        </div>
    )
}