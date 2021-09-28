# **realtime-chat**
![typescript](https://img.shields.io/github/languages/top/bryansouza/realtime-chat--frontend)

Real-time chat which supports emojis 😜 and uses Socket.IO library to establish a **WebSocket** connection.

<br>
<br>
<div align="center">
  <img src="https://user-images.githubusercontent.com/40837519/125233623-56e8fe00-e2b5-11eb-8173-4bb0c67e5430.gif" />
</div>
<br>

## Communication Protocols
The **HTTP(Hypertext Transfer Protocol)** and **WebSocket** communication protocols are applied when both **client** and **server** need to share information to each other.

### 1. WebSocket *(full-duplex)*

WebSocket is a bidirectional communication protocol that can send the data from the client to the server and vice versa by reusing the established connection channel. The connection is kept alive until terminated by either the client or the server.

### 2. HTTP *(half-duplex)*

The HTTP protocol is an unidirectional protocol that works on the top of TCP protocol which is a connection-oriented transport layer protocol, we can create the connection by using HTTP request methods in order to receive a response. After sending the response, the HTTP connection gets closed.

## Unicode Emoji *(v13.1)*
In this app, I'm using the latest official list of emojis from the <a href="https://unicode.org/">Unicode, Inc</a>.

## Usage

#### 1. Installing dependencies
```
yarn install
```

#### 2. Starting the client locally
```
yarn start
```
