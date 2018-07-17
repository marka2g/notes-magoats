import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/SearchBar';
import GifModal from './components/GifModal';
import GifList from './containers/GifList';
import request from 'superagent';
import './styles/app.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      gifs: [],
      selectedGif: null,
      modalIsOpen: false
    };
    // https://tighten.co/blog/react-101-building-a-gif-search-engine
    // gotcha workaround 1. - Binding in the Constructor
    // this.handleTermChange = this.handleTermChange.bind(this);
  }

  openModal(gif){
    this.setState({
      modalIsOpen: true,
      selectedGif: gif
    });
  }

  closeModal(){
    this.setState({
      modalIsOpen: false,
      selectedGif: null
    });
  }

  // gotcha workaround 2. - fat arrow func as a class method:
  handleTermChange = (term) => {
    const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=7bOi5OiY3WC2tETfycj2FaNDJ7t7IK88&limit=20`;

    // request.get(url, function(err, res) {
    request.get(url, (err, res) => {
      // console.log(res.body.data[0]);
      this.setState({ gifs: res.body.data })
    });
  }

  // gotcha workaround 3. - fat arrow func as a part of the handler - hmmm doesnt work
  // <SearchBar onTermChange={term => this.handleTermChange(term)} />
  render() {
    return (
      <div>
        <SearchBar onTermChange={this.handleTermChange} />
        <GifList gifs={this.state.gifs}
                 onGifSelect={selectedGif => this.openModal(selectedGif)}/>
        <GifModal modalIsOpen={this.state.modalIsOpen}
                  selectedGif={this.state.selectedGif}
                  onRequestClose={ () => this.closeModal() } />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
