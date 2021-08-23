import React from 'react';
import './app.scss';
import { ChannelList } from './ChannelList';
const SERVER = "http://192.168.1.67:3001";
const socket = require("socket.io-client")(SERVER, { transports: ["websocket"] });


export class App extends React.Component {

  state = {
    channels: null,
    socket: null,
    channel: null,
    current_input: ""
  }

  //socket;

  componentDidMount() {
    //this.loadChannels();
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
    })
  }

  handleButtonClick = () => {
    console.log("bad");
    this.socket.emit('cum', "6");
  }

  send = () => {
    console.log(this.current_input);
    if(this.state.current_input && this.state.current_input !== "") {
      this.setState({current_input: ''});
    }
  }

  handleInput = e => {
    this.setState({current_input: e.target.value});
  }

  render() {
   
    return (
      <div className="App">
        <header className="App-header">

        </header>
      </div>
    );
    
  }
}

