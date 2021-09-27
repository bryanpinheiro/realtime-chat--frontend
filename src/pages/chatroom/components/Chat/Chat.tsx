import "./Chat.css";
import useChatUILogic from "./ChatUILogic";
import MessageList from "../MessageList/MessageList";

export default function Chat(props: any) {

    const { functions, messages, draftMessage } = useChatUILogic(props.selectedUser);

    return (
        <div className="chatBg">
            <div className="chatView" onScroll={functions.handleScroll}>
                { 
                    (props.selectedUser) ?
                        <MessageList messages={messages} /> 
                    :
                        <h1 className="chat-warning">Select a contact</h1> 
                }
            </div>
            <div className="chatBottom">
                <input
                    value={draftMessage}
                    placeholder="Type a message"
                    className="textInput"
                    type="text"
                    onChange={functions.onChangeText}
                    onKeyUp={functions.handleKeyUp}
                />
                <button className="btnSend" onClick={functions.handleSend}>
                    Send
                </button>
            </div>
        </div>
    )
}