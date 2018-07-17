import React from 'react';

// Currently, our GifItem is only expecting a prop object called image. Because image.onGifSelect() doesn't make as much sense, we're going to do a bit of ES2015 shorthand to assign any objects underneath image to their own vars.
// const GifItem = (image) => {} - gives us image.gif and image.onGifSelect, we can write:
// instead - const GifItem = ({gif, onGifSelect}) => {}
// so we can access our props as gif and onGifSelect directly!
const GifItem = ({gif, onGifSelect}) => {
  // Next, we need our App component to know when a gif is clicked so that it can set selectedGif and modalIsOpen on state accordingly. Once again, we're going to have to pass a handler down into a child component as a prop, but this time, we'll have to do it twice, first to GifList and then to GifItem.
  return (
    <div className="gif-item" onClick={() => onGifSelect(gif)}>
      <img src={gif.images.downsized.url} />
    </div>
  )
}
export default GifItem;
