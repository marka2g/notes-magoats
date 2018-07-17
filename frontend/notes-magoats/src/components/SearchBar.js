import React, {Component} from 'react';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {term: ''}
  }

  // This is one of the most important things to remember when you're working with React. When you're initializing state in the constructor, you can set it directly with this.state = {}. However, if you want to signal to React that the state has changed so that it knows to re-render, you need to call this.setState() instead. This means you should never call this.state = {} outside of a class constructor.
  onInputChange(term) {
    this.setState({term});
    // We need a way to pass data from a child component (SearchBar) to its parent (App), and in React, we can do that through props -- data or callbacks passed from a parent component.
    this.props.onTermChange(term);
  }

  // fat-arrow functions - Here, we're telling React that every time it notices we've changed our input, it should fire an onChange event and pass the value — our search term — to our onInputChange() class method. Let's take a closer look at that now: {evt => this.onInputChange(evt.target.value)} similar to this:
  // function(event) {
  //   this.onInputChange(event.target.value);
  // }
  render(){
    return(
      <div className="search">
        <input placeholder="Enter text to search for gifs!" onChange={evt => this.onInputChange(evt.target.value)} />
      </div>
    );
  }
}
// export makes our SearchBar available to import by other pieces of our application, as we are about to do in our App class.
// The default means that this module is only exporting one value — in this case, the class SearchBar.
export default SearchBar;
