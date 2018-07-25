import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import { Container, Form, Item, Button, Text, Toast } from 'native-base';
import { Confirm } from './common';

class EmployeeEdit extends Component {
  state = { showModal: false, showToast: false };

  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;
    this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
  }

  onTextPress() {
    const { phone, shift } = this.props;

    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  }

  onAccept() {
    const { uid } = this.props.employee;
    this.props.employeeDelete({ uid });
  }

  onDecline(){
    this.setState({ showModal: false});
  }

  render() {
    return (
      <Container>
        <EmployeeForm {...this.props} />

          <Button block rounded success style={styles.button}
            onPress={this.onButtonPress.bind(this)}>
            <Text>Salvar</Text>
          </Button>

          <Button block rounded danger style={styles.button}
            onPress={() => this.setState({ showModal: !this.state.showModal })}>
            <Text>Deletar</Text>
          </Button>
        <Button block rounded info style={styles.button}
          onPress={this.onTextPress.bind(this)}>
          <Text>Send Message</Text>
        </Button>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to delete this?
        </Confirm>
      </Container>
    )
  }
}

const styles = {
  button:{
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10
  }
};

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;

  return { name, phone, shift };
};

export default connect(mapStateToProps, {
  employeeUpdate, employeeSave, employeeDelete
})(EmployeeEdit);
