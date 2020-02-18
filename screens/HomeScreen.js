import { connect } from "react-redux";
import * as React from "react";
import { Text, Button, View } from "react-native";

import { addTodo } from "../actions";
import globalStyles from "../styles";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  handleOnPress = async () => {
    this.props.dispatch(addTodo(new Date().getUTCSeconds()));
  };

  handleClear = async () => {
    this.props.dispatch({
      type: "CLEAR_TODOS"
    });
  };

  render() {
    const list = [];

    for (let todo of this.props.todos) {
      list.push(<Text key={todo.id}>{todo.text}</Text>);
    }
    return (
      <View>
        <Button onPress={this.handleOnPress} title="Add todo"></Button>
        <Button onPress={this.handleClear} title="Delete all todos"></Button>

        {list}
        <View style={globalStyles.margin}>
          <Button
            onPress={() => {
              this.props.navigation.navigate("About");
            }}
            title="Nav"
          ></Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos
  };
};
export default connect(mapStateToProps)(HomeScreen);
