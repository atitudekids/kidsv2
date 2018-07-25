import React, { Component } from 'react';
import { connect } from 'react-redux';
import { employeeUpdate, employeeCreate, employeeInitialize } from '../actions';
import { Container, Button, Text , Content} from 'native-base'
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends Component {

  componentWillMount() {
      this.props.employeeInitialize();
  }
  onButtonPress() {
    const { name, phone, shift } = this.props;

    this.props.employeeCreate({ name, phone, shift: shift || 'Segunda' });
  }

  render() {
    return (
      <Container>
        <Content>
          <EmployeeForm {...this.props} />
          <Button block rounded info
            onPress={this.onButtonPress.bind(this)}
            style={styles.button}>
            <Text>Create</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = {
  button:{
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  }
};

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;

  return { name, phone, shift };
};

export default connect(mapStateToProps, {
  employeeUpdate, employeeCreate, employeeInitialize
})(EmployeeCreate);
