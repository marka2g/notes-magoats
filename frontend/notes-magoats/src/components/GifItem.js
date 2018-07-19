import React, {Component} from 'react';

class GifItem extends Component {
  constructor(props) {

    // Notice that we're passing through props as an argument in the constructor() and super() methods. This allows us to access this.props within our constructor, but you don't need it unless you're trying to pass props through to local state.
    super(props);
    // "Wait a minute," you're probably saying. "I thought you told me that we are only supposed to fire actions to update the application's state!"
    // yes, this is true to an extent. Anything that affects the application's store should absolutely be sent through an action and reducer. However, we're only managing a small piece of UI here, and trying to keep track in the Redux store whether all of these individual GifItems are favorited would require some rather complex code.
    // There's nothing wrong with using React's state for minor UI changes on individual components, but if it's going to affect other parts of the application or involves an external API call, you should probably dispatch an action instead.
    this.state = { favorited: this.props.isFavorite };
  }

  // Here, we're setting the favorited key on state so we know whether to render a filled-in or empty heart to show whether a gif has been favorited or not. We're also going to use the props onFavoriteSelect and onFavoriteDeselect to fire our actions, so we'll have to add those to our GifList, Favorites, and Home components next.
  favoriteGif() {
    this.setState({ favorited: true });
    this.props.onFavoriteSelect(this.props.gif);
  }

  unfavoriteGif() {
    this.setState({ favorited: false });
    this.props.onFavoriteDeselect(this.props.gif);
  }

  // In this method, we're doing one of three things. If the user isn't logged in, we shouldn't show the hearts at all when they search for gifs; we don't want them favoriting gifs if they're not authenticated. If they are logged in, we are rendering FontAwesome heart icons based on whether or not the gif is currently favorited, and then we're calling our favoriteGif() and unfavoriteGif() methods from our click handlers to toggle the state.
  renderFavoriteHeart = () => {
    // console.log(`authenticated?: ${this.props.isAuthenticated}`);
    // console.log(`favorited?: ${this.state.favorited}`);
    if (! this.props.isAuthenticated) {
      return '';
    }
    if (this.state.favorited) {
      return <i className="favorite fa fa-heart fa-2x" onClick={() => this.unfavoriteGif()} />;
    }

    return <i className="favorite fa fa-heart-o fa-2x" onClick={() => this.favoriteGif()} />;
  };

  render() {
    return (
      <div className="gif-item">
        { this.renderFavoriteHeart() }
        <img src={ this.props.gif.images.downsized.url } onClick={() => this.props.onGifSelect(this.props.gif)} />
      </div>
    )
  }
}
export default GifItem;
