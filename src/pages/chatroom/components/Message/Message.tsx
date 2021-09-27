import "./Message.css";

export default function Message(props: any) {
    return (
        <div className={`messageRow${ !props.leftSide ? " right" : '' }`}>
            <div className={`outerMessage${ !props.isFirst ? " first" : '' }`}>
                <div className="innerMessage">
                    {props.text}
                </div>
            </div>
        </div>
    )
}