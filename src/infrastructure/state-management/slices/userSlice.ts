import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: "",
        name: "",
        contactList: [] as any[],
    },
    reducers: {
        join: (state, action) => {
            state.id = action.payload.currentUser.userID;
            state.name = action.payload.currentUser.name;
            state.contactList = action.payload.contacts;
        },
        addContact: (state, action) => {
            const contactIndex = state.contactList.findIndex((contact) => contact.userID === action.payload.contact.userID);
            const isCurrentUser = state.id === action.payload.contact.userID;
            
            if(!isCurrentUser) {
                if(contactIndex >= 0) {
                    state.contactList[contactIndex].isOnline = true;
                } else {
                    state.contactList.push(action.payload.contact);
                }
            }
        },
        addMessage: (state, action) => {
            const contactIndex = state.contactList.findIndex((contact) => contact.userID === action.payload.userID);
            if(contactIndex >= 0) {
                state.contactList[contactIndex].messages.push(action.payload.message);
            }
        },
        contactHasDisconnected: (state, action) => {
            const contactIndex = state.contactList.findIndex((contact) => contact.userID === action.payload.userID);

            if(contactIndex >= 0) {
                state.contactList[contactIndex].isOnline = false;
            } 
        },
        leave: (state) => {
            state.id = "";
            state.name = "";
            state.contactList = [];
        }
    }
})

export const { join, addContact, leave, addMessage, contactHasDisconnected } = userSlice.actions;

export default userSlice.reducer;