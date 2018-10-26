import React, {Component} from 'react';
import Modal from './Modal.js'

class RoomList extends Component {
    constructor(props){
        super(props);

        this.state = {
            rooms: [],
            newRoomName: '',
            isOpen: false
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    toggleModal=()=> {
        this.setState({isOpen: !this.state.isOpen});
        this.clearCreateRoomForm();
    }

    componentDidMount=() =>{
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat(room)})
            //console.log(room);
        });
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        if (!this.state.newRoomName){ return }
        this.createRoom();
    }

    handleChange=(e)=>{
        this.setState({newRoomName: e.target.value});
    }

    clearCreateRoomForm=()=>{
        this.setState({newRoomName: ''});
    }

    createRoom=()=>{
        this.roomsRef.push({
            name: this.state.newRoomName
        });
        this.toggleModal();
    }

    showRoomName=(room)=>{
        if (this.props.activeRoomId===room.key){
            return <b>{room.name}</b>;
        } else {
            return room.name;
        }
    }

    render(){
        return(
        <div className='RoomList'>
        <Modal show={this.state.isOpen} onClose={this.toggleModal}>
            <form onSubmit = { (e)=> this.handleSubmit(e)}>
                <input type='text' value={this.state.newRoomName} onChange = {(e) =>this.handleChange(e)}/>
                <input type='submit' />
            </form>
        </Modal>
        <button type="button" onClick={this.toggleModal}>
        Create Room
        </button>
        <table id='room-list'>
            <colgroup>
                <col id='room-name' />
            </colgroup>
            <thead>
                <tr>
                    <td>Chat Room List</td>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.rooms.map((room) =>
                        <tr className='room' key={room.key} onClick={()=>this.props.handleRoomChange(room)}>
                        <td>{this.showRoomName(room)}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>

        </div>
        );
    }
}

export default RoomList;