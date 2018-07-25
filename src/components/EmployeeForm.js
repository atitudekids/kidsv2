import React, { Component } from 'react';
import { connect } from 'react-redux';
import { employeeUpdate } from '../actions';
import { Body, Button, Container, Content, Form, Header, Input, Item, Label, Left,
Picker, Right, Text, Title } from 'native-base';


class EmployeeForm extends Component {

  render() {
    return (
      <Form style={styles.form}>
        <Item floatingLabel style={styles.item}>
          <Label>Name</Label>
          <Input
            onChangeText={value => this.props.employeeUpdate({ prop: 'name', value })}
            value={this.props.name}
          />
        </Item>

        <Item floatingLabel style={styles.item}>
          <Label>Phone</Label>
          <Input
            onChangeText={value => this.props.employeeUpdate({ prop: 'phone', value })}
            value={this.props.phone}
          />
        </Item>

        <Item picker style={styles.picker}>
          <Label>Dia da semana</Label>
          <Picker
            mode="dropdown"
            style={{ width: undefined }}
            placeholder="Choose one"
            selectedValue={this.props.shift}
            onValueChange={value => this.props.employeeUpdate({ prop: 'shift', value })}
          >
            <Picker.Item label="Segunda" value="Segunda" />
            <Picker.Item label="Terca" value="Terca" />
            <Picker.Item label="Quarta" value="Quarta" />
            <Picker.Item label="Quinta" value="Quinta" />
            <Picker.Item label="Sexta" value="Sexta" />
          </Picker>
        </Item>
      </Form>
    );
  }
}

const styles = {
  form:{
    marginTop: 10,
    marginRight: 10
  },
  item:{
    marginTop: 20
  },
  picker:{
    marginLeft: 14,
    marginTop: 20
  },
  button:{
    marginTop: 20
  }
};

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;

  return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeUpdate })(EmployeeForm);
