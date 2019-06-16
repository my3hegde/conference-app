import { connect } from 'react-redux';
import ArtistsView from './ArtistsView';
import { getInfo } from '../../reducers/ConferenceReducer/actions';

const mapStateToProps = state => ({
  ...state.conference
});

const mapDispatchToProps = dispatch => ({
  getInfo: () => {
    dispatch(getInfo());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsView);