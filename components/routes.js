import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, NavigatorIOS, Text, TouchableHighlight, View } from 'react-native';
import Gallery from './gallery';
// Storage
import Storage from './storage';

export default class NavigatorIOSApp extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Storage,
          title: 'Home',
        }}
        style={{ flex: 1 }}
      />
    );
  }
}

class MyScene extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  };

  _onForward = () => {
    this.props.navigator.push({
      title: 'Scene 1',
      component: MyScene,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Current Scene: {this.props.title}</Text>
        <TouchableHighlight onPress={this._onForward}>
          <Text>Tap me to load the next scene</Text>
        </TouchableHighlight>
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
