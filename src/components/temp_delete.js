    blah_function(){
    let roomChanged=true;
    let messagesExist=true;
    if (roomChanged=1){
        if (messagesExist=1){
            //Clear Once then concat to this.state
        } else {
            //Clear once.
        }
    } else {
        //room didn't change
        //do nothing.
    }
}   


await this.promisedSetState({ messages: messages.concat(message)}, ()=> console.log("Messages: ",this.state.messages));

shouldComponentUpdate(nextProps,nextState){
    console.log(nextProps.activeRoom);
    console.log(this.props.activeRoom);
    console.log('-----');
    console.log(this.state.messages);
    console.log(nextState.messages);
    return true;
}

            //this.setState({ messages: messages.concat(message)}, ()=> console.log("Message concated: ",this.state.messages));
            //this.setState({item : items}, () => console.log("ITEMS : ",this.state.item) )
            //debugger;

            shouldComponentUpdate(prevProps){
                console.log('shouldComponentUpdate()');
                if (prevProps.activeRoom!==this.props.activeRoom){
                    console.log('--- true');
                    return true;
                 } else {
                    console.log('--- false');
                    return false;
                }
            }