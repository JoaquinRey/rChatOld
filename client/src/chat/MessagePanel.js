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
    
    loadMessages = () => {
        this.props.loadMoreMessages();
    }

    sendFile = () => {

    }

    render() {

        document.addEventListener("keydown", (e) => {
            if (e.code === "Enter") {
                this.send()
            }
        });

        let list = <div className="no-contents">There are no messages to show</div>;
        let load_messages = <div></div>
        if (this.props.channel && this.props.channel.messages) {
            load_messages = <button onClick={this.loadMessages}>Load More Messages</button>
            list = this.props.channel.messages.map(m => <Message key={m.id} id={m.id} author={m.author} content={m.content} />);
        }

        return(
            <div className="message-panel">
        
                <div className="messages">
                    <div className="load-messages">
                        {load_messages}
                    </div>
                    <div>
                        {list}
                    </div>
                </div>
                {this.props.channel && 
                    <div className="message-input">
                        <input type="text" onChange={this.handleInput} value={this.state.current_input} />
                        <form onSubmit={this.sendFile} className="file-submit">
                            <input type="file"></input>
                        </form>
                        <button onClick={this.send}>Send</button>
                    </div>
                }
            </div>
        )
    }

}