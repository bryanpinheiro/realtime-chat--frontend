import SocketIOClient from '../../infrastructure/services/socketIO';

class ChatRoomActions {
    onContactDisconnection: Function | null = null;
    onUpdateContactList: Function | null = null;
    onReceiveMessage: Function | null = null;

    constructor() {
        SocketIOClient.socket.on("private message", (receivedMessage) => {
            if(this.onReceiveMessage !== null) {
                this.onReceiveMessage(receivedMessage);
            }
        });

        SocketIOClient.socket.on("user/connected", (user) => {
            if(this.onUpdateContactList !== null) {
                this.onUpdateContactList(user);
            }
        });

        SocketIOClient.socket.on("user/disconnected", (userID) => {
            if(this.onContactDisconnection !== null) {
                this.onContactDisconnection(userID);
            }
        });
    }

    enter(username: string) {
        SocketIOClient.connect(username);
    }

    sendPrivateMessage(newMessage: any, selectedUser: any) {
        SocketIOClient.socket.emit("private message", {
            content: newMessage,
            to: selectedUser
        });
    }

    sendMessage(newMessage: any, selectedUser: any) {
        SocketIOClient.socket.emit("message", {
            content: newMessage,
            to: selectedUser
        });
    }

    exit() {
        SocketIOClient.disconnect();
    }

}

export default new ChatRoomActions();