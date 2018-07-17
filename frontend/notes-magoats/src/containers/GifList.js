import React from 'react';
import GifItem from '../components/GifItem';

// const instead of class stateless functional component. We can use these whenever our component does not need to actively track or modify our application's state — in fact, if you're writing idiomatic React code, most of your components will be written this way.
// `const` allows you to declare variables that won't be reassigned.
// const GifList = (props) => {}
// is the equivalent of this:
// var GifList = function(props) {}
const GifList = (props) => {
  // we are looping through the array of gifs passed down from state
  const gifItems = props.gifs.map((image) => {
    // Next, we need our App component to know when a gif is clicked so that it can set selectedGif and modalIsOpen on state accordingly. Once again, we're going to have to pass a handler down into a child component as a prop, but this time, we'll have to do it twice, first to GifList and then to GifItem.
    return <GifItem key={image.id}
                    gif={image}
                    onGifSelect={props.onGifSelect} />
  });

  return (
    <div className="gif-list">
      {gifItems}
    </div>
  );
};

export default GifList;
