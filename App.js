import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Camera from './components/cameraRoll';
import Route from './components/routes';

export default class App extends React.Component {
  render() {
    return <Route />;
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
