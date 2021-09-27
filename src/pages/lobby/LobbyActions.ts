import SocketIOClient from '../../infrastructure/services/socketIO';

class LobbyActions {
    enter(username: string) {
        SocketIOClient.connect({ username });
    }
}

export default new LobbyActions();