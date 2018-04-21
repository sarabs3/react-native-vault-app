import React from 'react';
import { StyleSheet, Text, View, CameraRoll, Image, ScrollView, Button, AsyncStorage } from 'react-native';
import RNFS from 'react-native-fs';
import Gallery from './cameraRoll';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
    };
  }

  saveToStorage() {
    let UID123_object = {
      name: 'Chris',
      age: 30,
      traits: { hair: 'brown', eyes: 'brown' },
    };
    // You only need to define what will be added or updated
    let UID123_delta = {
      age: 31,
      traits: { eyes: 'blue', shoe_size: 10 },
    };

    AsyncStorage.setItem('UID123', JSON.stringify(UID123_object), () => {
      AsyncStorage.mergeItem('UID123', JSON.stringify(UID123_delta), () => {
        AsyncStorage.getItem('UID123', (err, result) => {
          console.log(result);
        });
      });
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
        <Button onPress={this.saveToStorage} title="Get Photos" color="#571584" />
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

// require the module

var uploadUrl = 'https://www.nasa.gov/sites/default/files/thumbnails/image/ring-nebula-full_jpg.jpg'; // For testing purposes, go to http://requestb.in/ and create your own link
// create an array of objects of the files you want to upload
var files = [
  {
    name: 'test1',
    filename: 'test1.w4a',
    filepath: RNFS.DocumentDirectoryPath + '/test1.w4a',
    filetype: 'audio/x-m4a',
  },
  {
    name: 'test2',
    filename: 'test2.w4a',
    filepath: RNFS.DocumentDirectoryPath + '/test2.w4a',
    filetype: 'audio/x-m4a',
  },
];

var uploadBegin = response => {
  var jobId = response.jobId;
  console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
};

var uploadProgress = response => {
  var percentage = Math.floor(response.totalBytesSent / response.totalBytesExpectedToSend * 100);
  console.log('UPLOAD IS ' + percentage + '% DONE!');
};

// upload files
RNFS.uploadFiles({
  toUrl: uploadUrl,
  files: files,
  method: 'POST',
  headers: {
    Accept: 'application/json',
  },
  fields: {
    hello: 'world',
  },
  begin: uploadBegin,
  progress: uploadProgress,
})
  .promise.then(response => {
    if (response.statusCode == 200) {
      console.log('FILES UPLOADED!'); // response.statusCode, response.headers, response.body
    } else {
      console.log('SERVER ERROR');
    }
  })
  .catch(err => {
    if (err.description === 'cancelled') {
      // cancelled by user
    }
    console.log(err);
  });
