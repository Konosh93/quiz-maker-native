import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import AuthContainer from './containers/AuthContainer';

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AuthContainer />
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

export default () => <Provider store={store}><App /></Provider>