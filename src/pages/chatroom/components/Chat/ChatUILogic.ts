import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Message, User } from '../../../../interfaces';
import { addMessage } from "../../../../infrastructure/state-management/slices/userSlice";
import ChatRoomActions from '../../ChatRoomActions';
import basicEmoji from "../../../../infrastructure/unicode/basicEmoji";

const emojiRegex = require("emoji-regex/text");

export default function ChatUILogic(selectedUser: any) {

    const user = useSelector((store: any) => store.user) as User;
    const [ draftMessage, setDraftMessage ] = useState("");
    const dispatch = useDispatch();
    const regex = emojiRegex();

    const chatMessages = useMemo(() => {
        const contact: any = user.contactList.find((contact: any) => contact.userID === selectedUser);

        if(contact) {
            return contact.messages.slice();
        } else {
            return [];
        }
    }, [selectedUser, user.contactList]);

    useEffect(() => {
        ChatRoomActions.onReceiveMessage = function(receivedMessage: Message) {
            dispatch(addMessage({ userID: receivedMessage.author, message: receivedMessage }));
        }
    }, [dispatch]);

    function onChangeText(event: any) {
        setDraftMessage(event.target.value);
    }

    function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
        if(event.code.toLocaleUpperCase() === "ENTER") {
            handleSend();
        }
    }

    function handleSend() {
        if(draftMessage !== "" && selectedUser !== "") {
            let newMessage = {
                text: draftMessage,
                author: user.id,
                to: selectedUser
            };

            const SPACE = " ";
            const text = newMessage.text.trim();
            const words = text.split(SPACE) as string[];

            newMessage.text = words.map((word) => {
                const keywordIndex = basicEmoji.findIndex((emoji) => emoji.shortCode === word.toLocaleLowerCase());
                if(keywordIndex >= 0) {
                    const decimalCodePoint = parseInt("0x"+basicEmoji[keywordIndex].codePoint);
                    const emoji = String.fromCodePoint(decimalCodePoint);
                    return regex.test(emoji) ? emoji : word;
                } else {
                    return word;
                }
            }).join(SPACE);

            ChatRoomActions.sendPrivateMessage(newMessage.text, newMessage.to);

            setDraftMessage("");

            (newMessage as any).createdAt = Date.now();
            dispatch(addMessage({ userID: selectedUser, message: newMessage }));
        }
    }

    function handleScroll(event: React.UIEvent<HTMLDivElement>) {
        if(event.currentTarget.scrollTop === 0) {
            console.log("loading...");
        }
    }

    return {
        functions: {
            onChangeText,
            handleSend,
            handleKeyUp,
            handleScroll
        },
        messages: chatMessages,
        draftMessage: draftMessage
    }
}