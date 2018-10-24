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
        console.log('componentDidMount()',this.state.messages);
        //this.getMessages();
        }


    getMessages(){
        console.log('getMessages()',this.state.messages);
        let roomMessages = [];
        this.setState((state) => {
            return {messages: roomMessages};
          });
        console.log("--- Holding Message Array Before = ",roomMessages);
        this.messagesRef.orderByChild('roomId').equalTo(this.props.activeRoom).on('child_added', snapshot => {
            //let messages=this.state.messages;
            
            const message = snapshot.val();
            console.log("--- Firebase Snapshot = ",message);
            message.key = snapshot.key;
            roomMessages.push(message);
            console.log("--- Holding Message Array",roomMessages);
            this.setState((state) => {
                return {messages: roomMessages};
              });
        });


    //this.setState({ messages: roomMessages},()=>console.log("State Updated"),this.state.messages);
    console.log("State Updated ",this.state.messages);
    }

    componentDidUpdate(prevProps,nextState) {
        console.log('componentDidUpdate()',this.state.messages);
        if (prevProps.activeRoom!==this.props.activeRoom){
            //this.setState((state) => {
            //    return {messages: []};
            //  });
            this.getMessages();
            //this.setState({messages: []},()=>this.getMessages());
            console.log('--- Different Room',this.state.messages);
        }else{
            console.log('--- Same Room',this.state.messages);
        }

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