import React from 'react';
import Modal from 'react-modal';

// doesnt need to track state, use a functional component
const GifModal = (props) => {
  // error: Uncaught TypeError: Cannot read property 'images' of null
  // error fix:
  // Digging into our bundle.js file, we can see that it's looking for props.selectedGif.images and throwing an error because the images property does not exist on the current null selectedGif. We know we occasionally want selectedGif to be null, though, so let's add a check at the beginning of our component to return an empty div if this property doesn't exist:
  if (!props.selectedGif) {
    return <div></div>
  }

  // Next, we need our App component to know when a gif is clicked so that it can set selectedGif and modalIsOpen on state accordingly. Once again, we're going to have to pass a handler down into a child component as a prop, but this time, we'll have to do it twice, first to GifList and then to GifItem.
  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={ () => props.onRequestClose()}>
      <div>
        <img src={ props.selectedGif.images.original.url } />
        <p><strong>Source:</strong><a href={ props.selectedGif.source }> { props.selectedGif.source }> </a></p>
        <p><strong>Rating:</strong>{ props.selectedGif.rating }></p>
        <button onClick={() => props.onRequestClose()}>Close</button>
      </div>
    </Modal>
  );
}

export default GifModal;
