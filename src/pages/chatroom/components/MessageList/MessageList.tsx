import { Fragment } from "react";
import useMessageListUILogic from "./MessageListUILogic";
import Message from "../Message/Message";

export default function MessageList(props: any) {

    const { messages, messageListElement } = useMessageListUILogic(props.messages);

    return (
        <div ref={messageListElement}>
            {
                messages.map((message: any, index) => {
                    return (
                        <Fragment key={index}>
                            <Message 
                                isFirst={message.isFirst} 
                                leftSide={!message.isFromCurrentUser} 
                                text={message.text} 
                            />
                        </Fragment>
                    );
                })
            }  
        </div>
    )
}