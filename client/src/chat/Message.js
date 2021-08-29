import React from 'react';

export class Message extends React.Component {

    render() {
        return (
            <div className='message-instance'>
                <div><b>{this.props.author}</b></div>
                <div>
                    <span>{this.props.content}</span>
                    <button className="reply">R</button>
                </div>
                
            </div>
        )
    }
}