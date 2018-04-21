import React from 'react';
import { StyleSheet, Text, View, CameraRoll, Image, ScrollView, Button } from 'react-native';
import Gallery from './cameraRoll';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
    };
    this.getPhotos = this.getPhotos.bind(this);
  }
  getPhotos() {
    CameraRoll.getPhotos({
      first: 10,
      assetType: 'Photos',
    })
      .then(r => {
        this.setState({ photos: r.edges });
      })
      .catch(err => {
        throw err;
      });
  }
  _onForward = () => {
    this.props.navigator.push({
      title: 'Gallery',
      component: Gallery,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Camera Roll</Text>
        <Button onPress={this._onForward} title="Get Photos" color="#571584" />
        {/*<ScrollView>
          {this.state.photos.map((p, i) => (
            <Image key={i} style={{ width: 300, height: 200 }} source={{ uri: p.node.image.uri }} />
          ))}
        </ScrollView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
