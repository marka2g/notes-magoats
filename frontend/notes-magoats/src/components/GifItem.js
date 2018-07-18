import React, {Component} from 'react';

class GifItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="gif-item">
        <img src={ this.props.gif.images.downsized.url } onClick={() => this.props.onGifSelect(this.props.gif)} />
      </div>
    )
  }
}
export default GifItem;
