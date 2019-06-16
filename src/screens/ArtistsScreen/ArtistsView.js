import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ListItem, Card } from 'react-native-elements';
import Modal from 'react-native-modal';
import config from '../../config';
import { Button } from 'react-native-elements';

class ArtistsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      conference:{artists:[]},
      artist:{},
      modal:false
    };
  }

  componentDidMount() {
    const { getInfo } = this.props;
    getInfo();
    this.setState({artist:{},modal:false})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.completed) {
      this.setState({
        conference: nextProps.conference,
        error: nextProps.error,
        completed: nextProps.completed,
        modal: false
      });
    }
  }

  render() {
    return (
      <View>
        {
          this.state.conference.artists.map((l, i) => (
            <ListItem
              key={i}
              avatar={{ uri: l.avatar }}
              title={l.name}
              subtitle={l.subtitle}
              onPress={() => this.setState({artist:l,modal:true})}
            />
          ))
        }
        {

          <Modal isVisible={this.state.modal}
            onSwipe={() => this.setState({ modal: false })}
            onBackdropPress={() => this.setState({ modal: false })}>
            <Card title={(this.state.artist.name || '').toUpperCase()} image={{ uri: this.state.artist.avatar }}>
              <View>
                <Text style={{ fontWeight: '700' }}>{this.state.artist.subtitle}</Text>
                <Text style={{ textAlign: 'justify' }}>{this.state.artist.bio}</Text>
                <Button
                  title='CLOSE'
                  buttonStyle={{
                    backgroundColor: config.PRIMARY_BG_COLOR,
                    marginTop: 10
                  }}
                  onPress={() => this.setState({ modal: false })}
                />
              </View>
            </Card>
          </Modal>
        }
      </View>
    );
  }

}

ArtistsView.propTypes = {
  getInfo: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  conference: PropTypes.object.isRequired
};

export default ArtistsView;