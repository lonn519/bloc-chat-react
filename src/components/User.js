import React, {Component} from 'react';
import Modal from './Modal.js';


class User extends Component{
    constructor(props){
        super(props);

        this.state = {
            newDisplayName: '',
            isDisplayNameModalOpen: false
        };


    }

    componentDidMount(){
        console.log('|componentDidMount');
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
          });
    }

    handleAuthButton=()=>{
        console.log('|handleAuthButton()');
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        var that = this;
        this.props.firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            console.log(' --- token:',token);
            // The signed-in user info.
            var user = result.user;
            console.log(' --- user:',user);
            var useremail = user.email;
            console.log(' --- email:',useremail);
            // ...
            that.props.setUser(user);
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            console.log(' --- errorCode:',errorCode);
            var errorMessage = error.message;
            console.log(' --- errorMessage:',errorMessage);
            // The email of the user's account used.
            var email = error.email;
            console.log(' --- email:',email);
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(' --- credential:',credential);
            // ...
          });
          

    }

    handleSignOutButton=()=>{
        console.log('|handleAuthButton()');
        this.props.firebase.auth().signOut();
    }

    handleChange(e){
        this.setState({newDisplayName: e.target.value});
    }

    handleSubmit(e){
        console.log('|handleSubmit(e)');
        e.preventDefault();
        if (!this.state.newDisplayName){ return }
        this.props.updateDisplayName(this.state.newDisplayName);
        //this.props.setUser(user);
        this.clearDisplayNameForm();
        this.toggleDisplayNameModal();

    }

    toggleDisplayNameModal=()=> {
        console.log('|toggleDisplayNameModal()');
        this.setState({isDisplayNameModalOpen: !this.state.isDisplayNameModalOpen});
        this.clearDisplayNameForm();
    }

    clearDisplayNameForm=()=>{
        this.setState({newDisplayName: ''});
    }

    showAuthButton=()=>{
        console.log('|showAuthButton()');
        if(this.props.isUserSignedIn){
            console.log(' --- isUserSignedIn=true');
            return(
                <div className='signed-in-buttons'>
                <button type="button" onClick={this.toggleDisplayNameModal}>
                Update Profile Name 
                </button>
                <button id='btn-signout' type="button" onClick={this.handleSignOutButton}>
                Sign-Out
                </button>
                </div>
            );
        } else {
            console.log(' --- isUserSignedIn=false');
            return (
                <div className='signout-in-buttons'>
                <button type="button" onClick={this.handleAuthButton}>
                Sign In
                </button>
                </div>
            );
        }
    }


    render(){
        return(
            <div className='User'>
            {this.props.user.displayName}
            {this.showAuthButton()}
            <Modal show={this.state.isDisplayNameModalOpen} onClose={this.toggleDisplayNameModal}>
            <form onSubmit = { (e)=> this.handleSubmit(e)}>
                <input type='text' value={this.state.newDisplayName} onChange = {(e) =>this.handleChange(e)}/>
                <input type='submit' />
            </form>
            </Modal>

            </div>
        );
    }
}

export default User;