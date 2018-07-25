import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Content, List, ListItem, Left, Text } from 'native-base';

class ItemLista extends Component {
  onRowPress() {
    Actions.employeeEdit({ employee: this.props.employee });
  }

  render() {
    const { name } = this.props.employee;

    return (
      //<Content onPress={this.onRowPress.bind(this)}>
        <List>
          <ListItem onPress={this.onRowPress.bind(this)}>
            <Text>{name}</Text>
          </ListItem>
        </List>
      //</Content>
    );
  }
}

export default ItemLista;
