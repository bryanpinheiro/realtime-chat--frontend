import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatRoomActions from '../../ChatRoomActions';
import { addContact, contactHasDisconnected } from "../../../../infrastructure/state-management/slices/userSlice";

export default function useContactListUILogic(contacts: any[], selectedUser: string) {

    const dispatch = useDispatch();
    const user = useSelector((store: any) => store.user);

    useEffect(() => {
        ChatRoomActions.onUpdateContactList = (contact: any) => {
            dispatch(addContact({ contact }));
        }

        ChatRoomActions.onContactDisconnection = (userID: string) => {
            dispatch(contactHasDisconnected({ userID }));
        }
    }, [user.id, dispatch]);

    const friendlyContacts = useMemo(() => {
        return contacts.map((contact) => {
            return {
                id: contact.userID,
                name: contact.name.slice(0, 10),
                status: contact.isOnline ? "online" : "offline",
                isSelected: selectedUser === contact.userID ? "selected" : ""
            }
        });
    }, [selectedUser, contacts]);

    return {
        contacts: friendlyContacts
    }
}