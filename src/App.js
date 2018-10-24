import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';


// Initialize Firebase
var config = {
  apiKey: "AIzaSyC07r_dq81SrsdW9k9aqybC13fzpL3tNis",
  authDomain: "bloc-chat-react-7c767.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-7c767.firebaseio.com",
  projectId: "bloc-chat-react-7c767",
  storageBucket: "bloc-chat-react-7c767.appspot.com",
  messagingSenderId: "1013478982516"
};

firebase.initializeApp(config);


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeRoom: ''
    }
  }

  handleRoomChange(roomID){
    this.setState({activeRoom:roomID})
  }


  render() {
    return (
      <div className="App">
        <main>
          <section className='roomList'>
          <RoomList 
            firebase={firebase}
            activeRoom = {this.state.activeRoom}
            handleRoomChange = {(roomId)=> this.handleRoomChange(roomId)}
          />
          </section>
          <section className='messageList'>
            <MessageList
            firebase={firebase}
            activeRoom={this.state.activeRoom}
          />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
