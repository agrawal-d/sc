import { connect } from "react-redux";
import * as React from "react";
import { Text, Button, View } from "react-native";
import colors from "../constants/Colors";
import { addTodo } from "../actions/actions";
import globalStyles from "../styles/styles";
import Colors from "../constants/Colors";

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

    function getRgb() {
      let ret = "rgb(";
      ret += (Math.random() * 255).toString() + ",";
      ret += (Math.random() * 255).toString() + ",";
      ret += (Math.random() * 255).toString() + ")";
      return ret;
    }
    console.log("EVENTS", this.props.events);
    for (let todo of this.props.events) {
      list.push(
        <Text
          key={todo.id}
          style={{ padding: 10, backgroundColor: getRgb(), marginBottom: 10 }}
        >
          {todo.text}
        </Text>
      );
    }
    return (
      <View style={globalStyles.margin}>
        <View style={globalStyles.margin}>
          <Button
            onPress={this.handleOnPress}
            color={Colors.themePrimary}
            title="Add todo"
          ></Button>
        </View>
        <View style={globalStyles.margin}>
          <Button onPress={this.handleClear} title="Delete all todos"></Button>
        </View>
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
    events: state.events
  };
};
export default connect(mapStateToProps)(HomeScreen);
