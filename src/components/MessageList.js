import React, {Component} from 'react';
import Moment from 'react-moment';

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
        if (prevProps.activeRoomId!==this.props.activeRoomId){
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
        this.messagesRef.orderByChild('roomId').equalTo(this.props.activeRoomId).on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            console.log(" --- Firebase Snapshot = ",message);
            roomMessages.push(message);
            console.log(" --- Holding Array During",roomMessages);
            this.setState({messages:roomMessages}, ()=>console.log(' --- State: Messages Updated',this.state.messages));
        });
    }

    formatSentAt=(sentAt)=>{
        //https://stackoverflow.com/questions/4631928/convert-utc-epoch-to-local-date/22237139
        var d = new Date(0);
        return d.setUTCSeconds(sentAt);

    }


    render(){
        var isRoomSelected =false;
        if(this.props.activeRoomId!==''){
            isRoomSelected=true;
        }
        return(
        <div className='MessageList'>
            <table id='message-list'>
                <colgroup>
                    <col message='message-content' />
                </colgroup>
                <thead>
                    <tr>
                    {isRoomSelected ? (
                        <td colSpan='2' className='roomTitle'>Room name: {this.props.activeRoomName} (id={this.props.activeRoomId})</td>
                    ) : (
                        <td className='roomTitle'>Please Select A Room To Show Messages</td>
                    )}
                    </tr>
                        
                </thead>
                <tbody>
                    {this.state.messages.map(message => (
                        <React.Fragment key={message.key}>
                            <tr className='message-meta-data' key={'meta' + message.key}>
                            <td className='message-username'>{message.username}</td>
                            <td className='message-time'><Moment format="HH:mm:ss YYYY/MM/DD">{this.formatSentAt(message.sentAt)}</Moment></td>
                            </tr>
                            <tr className='message-content' key={message.key}>
                            <td colSpan='2'>{message.content}</td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            </div>
        );
    }
}

export default MessageList;