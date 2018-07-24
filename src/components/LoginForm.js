import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Container, Form, Item, Input, Icon, Label, Button, Body, Title, StyleProvider, Spinner } from 'native-base';


class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Form style={styles.form}>
          <Item floatingLabel style={styles.item} last>
            <Label>Username</Label>
            <Input onChangeText={this.onEmailChange.bind(this)} value={this.props.email}/>
          </Item>
          <Item floatingLabel style={styles.item} last>
            <Label>Password</Label>
            <Input onChangeText={this.onPasswordChange.bind(this)} value={this.props.password} />
          </Item>
          <Button block rounded info disabled={this.props.loading}
            onPress={this.onButtonPress.bind(this)}
            style={styles.button}>
            <Text>Login</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

const styles = {
  container:{
  },
  form:{
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10
  },
  item:{
    marginTop: 20
  },
  button:{
    marginTop: 20
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginForm);
