import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import { Container, Form, Item, Button, Text} from 'native-base';
//import { Card, CardSection, Button, Confirm } from './common';

class EmployeeEdit extends Component {
  state = { showModal: false };

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
        <Item>
          <Button block rounded info
            onPress={this.onButtonPress.bind(this)}>
            <Text>Save changes</Text>
          </Button>
        </Item>

        <Item>
          <Button block rounded info
            onPress={this.onTextPress.bind(this)}>
            <Text>Schedule</Text>
          </Button>
        </Item>

        <Item>
          <Button block rounded info
            onPress={() => this.setState({ showModal: !this.state.showModal })}>
            <Text>Fire Employee</Text>
          </Button>
        </Item>
      </Container>
        // <Confirm
        //   visible={this.state.showModal}
        //   onAccept={this.onAccept.bind(this)}
        //   onDecline={this.onDecline.bind(this)}
        // >
        //   Are you sure you want to delete this?
        // </Confirm>
      //</Container>
    )
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;

  return { name, phone, shift };
};

export default connect(mapStateToProps, {
  employeeUpdate, employeeSave, employeeDelete
})(EmployeeEdit);
