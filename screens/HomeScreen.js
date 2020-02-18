import { connect } from "react-redux";
import * as React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as WebBrowser from "expo-web-browser";

import { MonoText } from "../components/StyledText";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  handleOnPress = () => {
    this.props.dispatch({
      type: "ADD_TODO",
      id: Math.random(),
      text: `This is a todo!`
    });
  };

  render() {
    const todos = [];
    for (let todo of this.props.todos) {
      todos.push(
        <Text key={todo.id}>
          {todo.text} - {todo.id}
        </Text>
      );
    }

    return (
      <View style={styles.container}>
        <Button onPress={this.handleOnPress} title="Add todo"></Button>
        {todos}
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20
  }
});

const mapStateToProps = state => {
  return {
    todos: state.todos
  };
};
export default connect(mapStateToProps)(HomeScreen);
