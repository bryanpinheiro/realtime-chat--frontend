import { Redirect } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Form from './components/Form/Form';
import './LobbyStyle.css';

import SocketIOClient from "../../infrastructure/services/socketIO";
import { join } from "../../infrastructure/state-management/slices/userSlice";

export default function LobbyPage() {
    
    const user = useSelector((state: any) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const sessionID = localStorage.getItem("sessionID");

        if (sessionID) {
            SocketIOClient.connect({ sessionID });
        }

        SocketIOClient.onConnectUser = (contacts: any, currentUser: any) => {
            dispatch(join({ currentUser, contacts }));
        }
    }, [dispatch]);

    return (
        !user.id ? (
            <div className="lobbyBg">
                <Form />
            </div>
        ) : (
            <Redirect to="/chatroom" />
        )
    )
}