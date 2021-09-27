import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ContactList from './components/ContactList/ContactList';
import Chat from './components/Chat/Chat';

import './ChatRoomStyle.css';
import { leave } from "../../infrastructure/state-management/slices/userSlice";

export default function ChatRoomPage(props: any) {

    const user = useSelector((state: any) => state.user);
    const [selectedUser, setSeletectedUser] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(leave());
        }
    }, [dispatch]);

    return (
        user.id ? (
            <div className="chatroomBg">
                <div className="chatroomContainer">
                    <ContactList handleSelectContact={setSeletectedUser} contacts={user.contactList} selectedUser={selectedUser} />
                    <Chat selectedUser={selectedUser} />
                </div>
            </div>
        ) : (
            <Redirect to="/" />
        )
    )
}