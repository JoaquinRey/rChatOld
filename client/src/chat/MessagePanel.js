import React from 'react';
import { Message } from './Message';

const SERVER = "http://192.168.1.67:3001";
const messageEndRef = React.createRef();


export class MessagePanel extends React.Component {
    state = { current_input: '' };

    send = () => {
        if (this.state.current_input && this.state.current_input !== '') {
            this.props.onSendMessage(this.props.channel.id, this.state.current_input);
            this.setState({ current_input: '' });
        }
    }

    processMessage = () => {
        if(this.state.current_input && this.state.current_input !== "") {
            this.props.onSendMessage(this.props.channel.id, this.state.current_input);
            this.setState({ current_input: "" });
        }

    }

    handleInput = e => {
        this.setState({ current_input: e.target.value });
    } 
    
    loadMessages = async (channel_id) => {
        fetch(SERVER + '/' + channel_id).then(async responce => {
            let messages = await responce.json();
            this.setState({});
        })
    }

    render() {

        document.addEventListener("keydown", (e) => {
            if (e.code === "Enter") {
                this.send()
            }
        });

        let list = <div className="no-contents">There are no messages to show</div>;
        if (this.props.channel && this.props.channel.messages) {
            list = this.props.channel.messages.map(m => <Message key={m.id} id={m.id} author={m.author} content={m.content} />);
        }

        return(
            <div className="message-panel">
                <div className="messages">{list}</div>
                {this.props.channel && 
                    <div className="message-input">
                        <input type="text" onChange={this.handleInput} value={this.state.current_input} />
                        <button onClick={this.send}>Send</button>
                    </div>
                }
            </div>
        )
    }

}