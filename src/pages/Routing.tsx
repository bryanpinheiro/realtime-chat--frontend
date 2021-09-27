import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import ChatRoomPage from './chatroom/ChatRoomPage';
import LobbyPage from './lobby/LobbyPage';

export default function Routing() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={LobbyPage} />
                <Route path="/chatroom" component={ChatRoomPage} />
            </Switch>
        </Router>
    )
}