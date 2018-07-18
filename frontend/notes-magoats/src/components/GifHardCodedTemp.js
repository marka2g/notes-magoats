import React from 'react';

const GifHardCodedTemp = ({gifs}) => {
  // Note: Remember from part 1 that when your function definition looks like GifsTemp does above, where you have something like ({gifs}) as your parameter list, that means this function is expecting an object passed in that has a property gifs. Rather than passing in an object with that property and then accessing gifs in our function as objectNameHere.gifs , this syntax allows us to pull out the gifs property of whatever object is passed in, and automatically assign it to a variable named gifs. So if we pass { title: 'stuff', gifs: 'abc' } into this function, the function would have a gifs variable available to it that was equal to 'abc'.
  const gifItems = gifs.map((gif) => {
    return(
      <li key={gif.id}><img src={gif.url} /></li>
    );
  });

  return (
    <ul className="gif-list">{gifItems}</ul>
  );
}

export default GifHardCodedTemp;
