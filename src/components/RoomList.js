import React, {Component} from 'react';

class RoomList extends Component {
    constructor(props){
        super(props);

        this.state = {
            rooms: []
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat(room)})
            console.log(room);
        });
    }
    render(){
        return(
        <div className='RoomList'>
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
                        <tr className='room' key={room.key}>
                        <td>{room.name}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
        </div>
        )
    }
}

export default RoomList;