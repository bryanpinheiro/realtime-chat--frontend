import io, { Socket } from "socket.io-client";

const ENDPOINT = "https://bryansouza--chat-api.herokuapp.com";

type Join = {
    userName: string,
    room: string
}

interface IChat {
    joinChat(payload: Join): void;
    connect(username: string): void;
    disconnect(): void;
}

class SocketIOClient implements IChat {
    onConnectUser: Function | null = null;
    socket: Socket;

    constructor() {
        this.socket = io(ENDPOINT, {
            autoConnect: false
        });

        this.socket.on("connect_error", (err) => {
            if (err.message === "invalid username" || err.message === "username is already taken") {
                console.log(err.message);
            }
        });

        this.socket.on("session", ({ sessionID, userID }) => {
            this.socket.auth = { sessionID };
            localStorage.setItem("sessionID", sessionID);
            (this.socket as any).userID = userID;
        });

        this.socket.on("users", (users) => {
            const currentUserId = (this.socket as any).userID;

            const currentUser = users.find((user: any) => user.userID === currentUserId);
            const contacts = users.filter((user: any) => user.userID !== currentUserId);

            if(this.onConnectUser) {
                this.onConnectUser(contacts, currentUser);
            }
        });
    }

    connect(auth: any) {
        this.socket.auth = auth;
        this.socket.connect();
    }

    joinChat(payload: Join) {
        this.socket.emit("join", payload);
    }

    disconnect() {
        this.socket.emit("disconnect");
        this.socket.off();
    }
}

export default new SocketIOClient();