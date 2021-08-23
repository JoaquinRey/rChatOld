import React from 'react';
import { Message } from './Message';

export class MessagePanel extends React.Component {
    state = { current_input: '' };
    send = () => {
        console.log(this.current_input);
        if (this.state.current_input && this.state.current_input !== '') {
            this.props.onSendMessage(this.props.channel.id, this.state.current_input);
            this.setState({ current_input: '' });
        }
    }

    handleInput = e => {
        this.setState({ current_input: e.target.value });
    }

    render() {
        let list = <div className="no-contents">There are no messages to show</div>;
        if (this.props.channel && this.props.channel.messages) {
            list = this.props.channel.messages.map(m => <Message key={m.id} id={m.id} author={m.author} content={m.content} />);
        }
    }
    
    return() {
        <div className="message-panel">
            <div className="messages">{list}</div>
            {this.props.channel && 
                <div className="message-input">
                    <input type="text" onChange={this.handleInput} value={this.state.current_input} />
                    <button onClick={this.send}>Send</button>
                </div>
            }
        </div>
    }


}