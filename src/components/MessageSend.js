import React, {Component} from 'react';


class MessageSend extends Component {
    constructor(props){
        super(props);

        this.state = {
            newMessage: ''
        };
        this.messagesRef = this.props.firebase.database().ref('messages');
    }

    handleMessageSubmit = (e) => {
        console.log('|handleMessageSubmit()',e);
        e.preventDefault();
        if (!this.state.newMessage){ return }
        this.sendMessage();
        this.clearMessageForm();
    }

    sendMessage = () => {
        console.log('|sendMessage()',this.state.newMessage);
        this.messagesRef.push({
        content: this.state.newMessage,
        roomId: this.props.activeRoomId,
        sentAt: Date.now(),
        username: this.props.user.displayName
        });
    }

    clearMessageForm = ()=>{
        console.log('|clearMessageForm()');
        this.setState({newMessage: ''});
    }

    handleMessageBoxChange = (e) => {
        console.log('|handleMessageBoxChange()',e);
        this.setState({newMessage: e.target.value});
    }

    render(){
        return(
            <div className='send-message'>
            <form onSubmit = { (e)=> this.handleMessageSubmit(e)}>
                <input type='text' placeholder="enter something" value={this.state.newMessage} onChange = {(e) =>this.handleMessageBoxChange(e)}/>
                <input type='submit' value="send"/>
            </form>
            </div>
        );
    }

}

export default MessageSend;