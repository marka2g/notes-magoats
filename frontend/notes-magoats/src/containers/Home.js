import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import SearchBar from '../components/SearchBar';
import GifList from '../components/GifList';
import GifModal from '../components/GifModal';
import '../styles/app.css';

class Home extends Component {
  render() {
    return (
      <div>
        <SearchBar onTermChange={ this.props.actions.requestGifs } />

        <GifList gifs={ this.props.gifs }
                 onGifSelect={ selectedGif => this.props.actions.openModal({selectedGif})}
                 onFavoriteSelect={selectedGif => this.props.actions.favoriteGif({selectedGif})}
                 onFavoriteDeselect={selectedGif => this.props.actions.unfavoriteGif({selectedGif})}
                 isAuthenticated={this.props.authenticated} />

        <GifModal modalIsOpen={this.props.modalIsOpen}
                  selectedGif={this.props.selectedGif}
                  onRequestClose={ () => this.props.actions.closeModal()} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log({
  //   gifs: state.gifs.data,
  //   modalIsOpen: state.modal.modalIsOpen,
  //   selectedGif: state.modal.selectedGif
  // });

  return {
    authenticated: state.auth.authenticated,
    gifs: state.gifs.data,
    modalIsOpen: state.modal.modalIsOpen,
    selectedGif: state.modal.selectedGif
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
