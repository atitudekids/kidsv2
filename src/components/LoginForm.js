import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
// import { Card, CardSection, Input, Button, Spinner } from 'native-base';
import { Container,Header, Form, Item, Input, Label, Button , Body, Title,StyleProvider} from 'native-base';


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

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  render() {
    return (
      <Container>
        <Form style={styles.container}>
        <Item floatingLabel style={styles.itens}>
          <Label>Username</Label>
          <Input onChangeText={this.onEmailChange.bind(this)} value={this.props.email}/>
        </Item>
        <Item floatingLabel style={styles.itens}>
          <Label>Password</Label>
          <Input onChangeText={this.onPasswordChange.bind(this)} value={this.props.password} />
        </Item>
        <Button block rounded info
          onPress={this.onButtonPress.bind(this)}
          style={styles.button}>
          <Text>Submit</Text>
        </Button>
      </Form>
      </Container>
      // <Card>
      //   <CardSection>
      //     <Input
      //       label="Email"
      //       placeholder="email@gmail.com"
      //       onChangeText={this.onEmailChange.bind(this)}
      //       value={this.props.email}
      //     />
      //   </CardSection>
      //
      //   <CardSection>
      //     <Input
      //       secureTextEntry
      //       label="Password"
      //       placeholder="password"
      //       onChangeText={this.onPasswordChange.bind(this)}
      //       value={this.props.password}
      //     />
      //   </CardSection>
      //
      //   <Text style={styles.errorTextStyle}>
      //     {this.props.error}
      //   </Text>
      //
      //   <CardSection>
      //     {this.renderButton()}
      //   </CardSection>
      // </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  container:{
    marginLeft: 10,
    marginRight: 10
  },
  item:{
    marginTop: 10
  },
  button:{
    marginTop: 10
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginForm);
