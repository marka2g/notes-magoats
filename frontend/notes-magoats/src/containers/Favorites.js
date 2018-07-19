import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import GifList from '../components/GifList';
import GifModal from '../components/GifModal';
import '../styles/app.css';

class Favorites extends Component {
  //  we're using this to fetch our favorite gifs as soon as the container loads.
  componentWillMount() {
    this.props.actions.fetchFavoritedGifs();
  }
  render() {
    // Here, we're setting an isFavorite prop to "true" so that our GifItems know that the initial state on all of these components should be "favorited".
    return (
      <div>
        <GifList gifs={ this.props.gifs }
                 onGifSelect={ selectedGif => this.props.actions.openModal({selectedGif})}
                 onFavoriteSelect={selectedGif => this.props.actions.favoriteGif({selectedGif})}
                 onFavoriteDeselect={selectedGif => this.props.actions.unfavoriteGif({selectedGif})}
                 isAuthenticated={this.props.authenticated}
                isFavorite={true} />

        <GifModal modalIsOpen={this.props.modalIsOpen}
                  selectedGif={this.props.selectedGif}
                  onRequestClose={ () => this.props.actions.closeModal()} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    gifs: state.gifs.favorites,
    modalIsOpen: state.modal.modalIsOpen,
    selectedGif: state.modal.selectedGif
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
