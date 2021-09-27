import { useMemo, useRef,  useEffect, MutableRefObject } from "react";
import { useSelector } from "react-redux";

export default function useMessageListUILogic(rawMessages: any[]) {
    
    const user = useSelector((state: any) => state.user);
    const messageListElement = useRef(null);

    useEffect(() => {
        (messageListElement as any as MutableRefObject<HTMLDivElement>).current.scrollIntoView({
            behavior: "smooth",
            block: "end"
        });
    }, [rawMessages]);

    let messages = useMemo(() => {
        const sortedMessages = rawMessages.sort((a, b) => a.createdAt - b.createdAt);

        return sortedMessages.map((message: any, index: number) => {
            let isFirst = false;
    
            if(index > 0) {
                if(sortedMessages[index - 1].author !== user.id) {
                    isFirst = true;
                }
            } else {
                isFirst = true;
            }
    
            return {
                isFirst,
                isFromCurrentUser: message.author === user.id ? true : false,
                text: message.text
            }
        });
    }, [rawMessages, user.id]);

    return {
        messages,
        messageListElement
    };
}