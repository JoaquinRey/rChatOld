import React from 'react';
import './test.scss';
import { ChannelList } from './ChannelList';
import { MessagePanel } from './MessagePanel';
const SERVER = "http://192.168.1.67:3001";
const socket = require("socket.io-client")(SERVER, { transports: ["websocket"] });


export class App extends React.Component {

  state = {
    channels: null,
    socket: null,
    channel: null,
    user_id: null,
    username: null
  }

  //socket;

  componentDidMount() {
    this.loadChannels();
    this.configureSocket();
  }

  configureSocket = () => {

    socket.on('connect', () => {
      console.log("pog");
    });

    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    })

    socket.on('channel', channel => {
      let channels = this.state.channels;
      channels.forEach(c => {
        if (c.id === channel.id) {
          c.participants = channel.participants;
        }
      });
      this.setState({ channels });
    })

    socket.on('message', message => {
      let channels = this.state.channels;
      channels.forEach(c => {
        if (c.id === message.channel_id) {
          if (!c.messages) {
            c.messages = [message];
          } else {
            c.messages.push(message);
          }
        }
      });
      this.setState({ channels });
    });

    this.socket = socket;
  }

  loadChannels = async () => {
    fetch(SERVER + '/getChannels').then(async responce => {
      let data = await responce.json();
      this.setState({channels: data.channels});
      console.log("fetch");
      console.log(data);
    })
  }

  handleButtonClick = () => {
    console.log("bad");
  }

  handleSendMessage = (channel_id, content) => {
    this.socket.emit('send-message', {channel_id, content, author: this.socket.id, id: Date.now()});
  }

  handleChannelSelect = id => {
    let channel = this.state.channels.find(c => {
      return c.id === id;
    });
    this.setState({ channel });
    this.socket.emit('channel-join', id, ack => {
    });
  }

  render() {
   
    return (
      <div className="App">
        <header className="App-header">
          <ChannelList channels={this.state.channels} onSelectChannel={this.handleChannelSelect} />
          <MessagePanel onSendMessage={this.handleSendMessage} channel={this.state.channel} />
        </header>
      </div>
    );
    
  }
}

