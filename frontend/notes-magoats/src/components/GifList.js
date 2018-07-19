import React from 'react';
import GifItem from './GifItem';

const GifList = (props) => {
  const gifItems = props.gifs.map((image) => {
    // Let's update our GifList next to pass down these new props. Since it's really not doing any sort of business logic, we can leave it as a functional component:
    return <GifItem key={image.id}
                    gif={image}
                    onGifSelect={props.onGifSelect}
                    onFavoriteSelect={props.onFavoriteSelect}
                    onFavoriteDeselect={props.onFavoriteDeselect}
                    isAuthenticated={props.isAuthenticated}
                    ifFavorite={props.isFavorite} />
  });

  return (
    <div className="gif-list">
      {gifItems}
    </div>
  );
};

export default GifList;
