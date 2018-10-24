import React, {Component} from 'react';

class MessageList extends Component {
    constructor(props){
        super(props);

        this.state = {
            messages: []
        };

        this.messagesRef = this.props.firebase.database().ref('messages');
    }

    componentDidMount=()=>{
        console.log('MessageList - componentDidMount()');
        this.messagesRef.orderByChild('roomId').equalTo(this.props.activeRoom).on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat(message)})
        });
        }

    render(){
        return(
        <div className='MessageList'>
            <table id='message-list'>
                <colgroup>
                    <col message='message-content' />
                </colgroup>
                <thead>
                    <tr>
                        <td className='roomTitle'>Room ID is {this.props.activeRoom}</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.messages.map((message) =>
                            <tr className='message' key={message.key}>
                            <td>{message.content}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            </div>
        );
    }
}

export default MessageList;