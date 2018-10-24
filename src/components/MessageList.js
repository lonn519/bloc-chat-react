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
        console.log('|componentDidMount()',this.state.messages);
        this.getMessages();
        }

    componentDidUpdate=(prevProps)=>{
        console.log('|componentDidUpdate()',this.state.messages);
        if (prevProps.activeRoom!==this.props.activeRoom){
            this.getMessages();
            console.log(' --- Different Room',this.state.messages);
        }else{
            console.log(' --- Same Room',this.state.messages);
        }
    }

    getMessages=()=>{
        console.log('|getMessages()',this.state.messages);
        let roomMessages = [];
        this.setState({messages:roomMessages}, ()=>console.log(' --- State: Messages Cleared',this.state.messages));
        console.log(" --- Holding Array Before Firebase= ",roomMessages);
        this.messagesRef.orderByChild('roomId').equalTo(this.props.activeRoom).on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            console.log(" --- Firebase Snapshot = ",message);
            roomMessages.push(message);
            console.log(" --- Holding Array During",roomMessages);
            this.setState({messages:roomMessages}, ()=>console.log(' --- State: Messages Updated',this.state.messages));
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