import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';
import { YellowBox } from 'react-native';

class App extends Component {

  componentWillMount() {
    var config = {
      apiKey: "AIzaSyA3M-68xirycbUijNET6tw9FTP_xZhK0fs",
      authDomain: "manager-4754b.firebaseapp.com",
      databaseURL: "https://manager-4754b.firebaseio.com",
      projectId: "manager-4754b",
      storageBucket: "manager-4754b.appspot.com",
      messagingSenderId: "118525790223"
    };
    firebase.initializeApp(config);
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
