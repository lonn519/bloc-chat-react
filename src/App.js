import React, { Component } from 'react';
import * as firebase from 'firebase';
import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList.js';


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
  render() {
    return (
      <div className="App">
        <main>
          <section className='roomList'>
          <RoomList 
          firebase={firebase}
          />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
