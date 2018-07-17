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
    // State is the data that will change over time; we want to initialize our state with a default value and then watch for any updates.
    this.state = {
      gifs: [],
      selectedGif: null,
      modalIsOpen: false
    };
    // https://tighten.co/blog/react-101-building-a-gif-search-engine
    // gotcha workaround 1. - Binding in the Constructor
    // this.handleTermChange = this.handleTermChange.bind(this);
  }

  // Because the modal component won't need to track state — our App component will be handling whether or not the modal should be open and passing this data in as props — we can make this a functional component.
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

  //!!!!  workaround explaination - fat-arrows doesn't introduce its own `this` Because it inherits the lexical this of its parent scope, we don't run into issues with binding. (This is also why we didn't see this issue in our SearchBar component.)
  // bundle.js:8088 Uncaught TypeError: _this2.setState is not a function
  // why?
  // React does not automatically assume that event handlers we pass as properties (such as onTermChange in our SearchBar) are bound to the main component object. (While this bit of automagical binding can be useful 99% of the time, if you're passing in event handlers from outside of your main React application, it can be incredibly limiting. They decided to follow the same semantics as regular ES2015 classes, binding this to its own instance rather than autobinding to the parent component. This is also why we need to call super() in our constructors!) this means that this.setState is actually being called on onTermChange, which does not have access to the React.Component methods inherited by our App component.  we need binding in the constructor or fat-arrows
  //  In this example, we are using the onTermChange property to pass the handleTermChange() callback from our App our SearchBar.
  // gotcha workaround 2. - fat arrow func as a class method:
  handleTermChange = (term) => {
    // console.log(term);
    const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=7bOi5OiY3WC2tETfycj2FaNDJ7t7IK88&limit=20`;

    // request.get(url, function(err, res) {
    // Let's refactor our code to pass the Giphy data into our components via this.setState.
    request.get(url, (err, res) => {
      // console.log(res.body.data[0]);
      this.setState({ gifs: res.body.data })
    });
  }

  // about modal - Because onRequestClose() from react-modal takes a function, we'll need to pass a handler down from our App component and tie it to the closeModal method we already created.

  // gotcha workaround 3. - fat arrow func as a part of the handler - hmmm doesnt work
  // <SearchBar onTermChange={term => this.handleTermChange(term)} />
  // we are setting a new property called onTermChange. Whenever we set a property on a child component in this way, it becomes available within that child component via this.props
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
// more on modal - Here, we're passing in our our modalIsOpen and selectedGif objects from state (even though we don't yet have a way to open a modal or select a gif.) We're also passing in our closeModal() method via a prop; whenever our third-party Modal component calls onRequestClose, such as when clicking outside of the modal or hitting the "close" button, it will call our App component's closeModal() function.
// Next, we need our App component to know when a gif is clicked so that it can set selectedGif and modalIsOpen on state accordingly. Once again, we're going to have to pass a handler down into a child component as a prop, but this time, we'll have to do it twice, first to GifList and then to GifItem.

ReactDOM.render(<App />, document.getElementById('app'));

// SearchBar module breakdown:
// Our App component renders our SearchBar component with a prop of onTermChange, passing in its own handleTermChange method as an argument
// Our SearchBar calls its constructor() method upon initialization. It creates a new state object and sets the term propery to an empty string.
// The user enters some text in the input field
// Every time the user enters/deletes a character, React calls the onChange method on the input, automatically passing in an event object as an argument. Within its callback, we call our SearchBar class's onInputChange class method, passing through the event object.
// The SearchBar's onInputChange method calls this.setState to update the state's term property. It also calls the App component's handleTermChange method, which is passed through the onTermChange prop.
// Our App logs(or calls out to API) the search term to the console via the handleTermChange method

// GifModal breakdown
// The user clicks a gif
// The GifItem component receives an onClick event anywhere in its main <div className="gif-item" onClick={() => onGifSelect(gif)}>
  // <img src={gif.images.downsized.url} />
// </div>
// It passes its gif prop as an argument into its onGifSelect prop
// The GifList receives the selectedGif. It, too, has an onGifSelect prop, and through this handler, it passes the selectedGif to its parent component
// The parent App component receives the selectedGif and passes it into its openModal method
// The openModal method sets the selectedGif on state and also sets modalIsOpen to true
// Because both modalIsOpen and selectedGif are props on the GifModal component, when React calls this.setState (not this.state = {}!), it knows it needs to re-render GifModal
// GifModal receives modalIsOpen and selectedGif as props, along with an onRequestClose() handler
// GifModal passes modalIsOpen and onRequestClose() as props to the third-party Modal component and renders the selectedGif
// The user clicks the close button
// The GifModal's onClick handler fires, calling the closeModal() function passed down from App
// The modal closes and selectedGif is set to null
// Our GifModal is re-rendered due to the new state and, because it has received an empty object for props.selectedGif, returns an empty div
