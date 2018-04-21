import React from 'react';
import { StyleSheet, Text, View, CameraRoll, Image, ScrollView, Button } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
    };
  }
  componentDidMount() {
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
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.photos.map((p, i) => (
            <Image key={i} style={{ width: 300, height: 200 }} source={{ uri: p.node.image.uri }} />
          ))}
        </ScrollView>
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
