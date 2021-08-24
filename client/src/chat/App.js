import React from 'react';
import './app.scss';
import { ChannelList } from './ChannelList';
import { MessagePanel } from './MessagePanel';
const SERVER = "http://192.168.1.67:3001";
const socket = require("socket.io-client")(SERVER, { transports: ["websocket"] });


export class App extends React.Component {

  state = {
    channels: null,
    socket: null,
    channel: null,
    user_id: null
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

