import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';


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
var provider = new firebase.auth.GoogleAuthProvider();

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInfo: {},
      isUserSignedIn: false,
      activeRoomId: '',
      activeRoomName: ''
    }
  }

  handleRoomChange=(room)=>{
    console.log(room.key);
    this.setState({activeRoomName:room.name});
    this.setState({activeRoomId:room.key});
  }

  handleAuthButtonClick=()=>{
    firebase.auth().signInWithPopup(provider);
  }
//
  setUser=(user)=>{
    console.log('|setUser(user)',user);
    if (user !==null){
      console.log(' --- displayName: ',user.displayName);
      console.log(' --- email: ',user.email);
      this.setIsUserSignedInTrue();
      let updatedUser = {displayName: '',email: ''};
      updatedUser.displayName = user.displayName;
      updatedUser.email = user.email;
      this.setState({userInfo: updatedUser},console.log(' --- State setUser complete'));
    } else {
      console.log(' --- User=null)');
      this.setIsUserSignedInFalse();
      let updatedUser = {displayName: '',email: ''};
      updatedUser.displayName = 'Guest';
      updatedUser.email = '';
      this.setState({userInfo: updatedUser},console.log(' --- State setUser to EMPTY/GUEST complete'));
    }
  }

  setIsUserSignedInTrue=()=>{
    this.setState({isUserSignedIn: true});
  }

  setIsUserSignedInFalse=()=>{
    this.setState({isUserSignedIn: false});
  }

  updateDisplayName=(newDisplayName)=>{
    console.log('|updateDisplayName()',newDisplayName);
    var user = firebase.auth().currentUser;
    console.log(' --- user:',user);
    if (user !==null){
    user.updateProfile({
      displayName: newDisplayName
    }).then(()=> {
      // Update successful.
      console.log(' --- setUser:',user);
      this.setUser(user);
      console.log(' --- after setUser:',user);
    }).catch((error)=> {
      // An error happened.
      console.log(' --- Error message:',error.message);
      console.log(' --- Error code:',error.code);
    });
  }
  }

  render() {
    return (
      <div className="App">
        <main>
          <section className='auth'>
            <User 
            firebase={firebase}
            setUser={(user)=> this.setUser(user)}
            user={this.state.userInfo}
            updateDisplayName = {(newDisplayName)=>this.updateDisplayName(newDisplayName)}
            isUserSignedIn = {this.state.isUserSignedIn}
            />
          </section>
          <section className='roomList'>
          <RoomList 
            firebase={firebase}
            activeRoomId = {this.state.activeRoomId}
            handleRoomChange = {(roomId)=> this.handleRoomChange(roomId)}
          />
          </section>
          <section className='messageList'>
          <MessageList
            firebase={firebase}
            activeRoomId={this.state.activeRoomId}
            activeRoomName={this.state.activeRoomName}
            user={this.state.userInfo}
          />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
