import React from 'react';
import propTypes from 'prop-types';
import { StyleSheet, Text, View, TextInput, Switch, TouchableHighlight } from 'react-native';

class Auth extends React.Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleAction = this.toggleAction.bind(this);
    this.onTouchableHighlightPress = this.onTouchableHighlightPress.bind(this);
    this.state = {
      name:'',
      email: '',
      password: '',
      isSignup: false,
      isProgressing:false,
    };
  }
  componentWillUpdate() {
    console.log(this.props.user);
  }

  handleClick(e) {
    
  }

  handleNameChange(text) {
    this.setState({ name: text });
  }


  handleEmailChange(text) {
    this.setState({ email: text });
  }

  handlePasswordChange(text) {
    this.setState({ password: text });
  }
  toggleAction(e) {
    this.setState({isSignup: !this.state.isSignup});
  }

  logout() {

  }

  onTouchableHighlightPress() {
    if (this.state.isSignup) {
      this.props.signup(this.state.name, this.state.email, this.state.password);
    } else {
      this.props.login(this.state.email, this.state.password);
    }
  }

  render() {
    if (this.props.user) {
      return (
        <View style={styles.container}>
        <Text>Hi {this.props.user.name}</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.toggle}> 
          <Text style={styles.toggleChild}>login</Text>
          <Switch
            style={styles.toggleChild} 
            value={this.state.isSignup}
            onValueChange={this.toggleAction}
          />
          <Text style={styles.toggleChild}>signup</Text>
        </View>
        {this.state.isSignup && 
          <TextInput
            style={styles.textlInput}
            autoCapitalize='none'
            autoCorrect={false}
            placeholder="Enter your name ..."
            onChangeText={this.handleNameChange} />
        }
        <TextInput
          style={styles.textlInput}
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
          placeholder="Enter your email ..."
          onChangeText={this.handleEmailChange} />          
        <TextInput
          style={styles.textlInput}
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
          secureTextEntry={true}
          placeholder="Enter your password ..."
          onChangeText={this.handlePasswordChange} />       
        <TouchableHighlight 
          style={styles.button}
          onPress={this.onTouchableHighlightPress}>
          <Text style={styles.buttonText}>{this.state.isSignup && 'sign up' || !this.state.isSignup && 'login'}</Text>
        </TouchableHighlight>   
      </View>
    );
  }
}

Auth.propTypes = {
  user: propTypes.object,
  errors: propTypes.object,
};

export default Auth;


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  textlInput: {
    alignSelf: 'stretch',
    height: 50,
    fontSize:20,
    color: '#4f4f4f',
    margin: 10,
    padding: 10,
    borderWidth: 0.3,
    borderRadius:2,
    borderColor: '#5b5656',
  },
  toggle: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleChild: {
    padding: 5,
  },
  button: {
    backgroundColor: '#b4cced',
    padding: 10,
    width: 120,
    borderRadius: 3,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 25,    
  },
});
