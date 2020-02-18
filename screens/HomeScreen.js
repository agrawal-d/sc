import { connect } from "react-redux";
import * as React from "react";
import { Text, Button, View, TouchableNativeFeedback } from "react-native";
import colors from "../constants/Colors";
import { addTodo } from "../actions/actions";
import globalStyles from "../styles/styles";
import Colors from "../constants/Colors";
import { FlatList } from "react-native-gesture-handler";

function Item({ event }) {
  return (
    <View style={globalStyles.margin}>
      <Text style={globalStyles.margin}>{event.fields.name}</Text>
    </View>
  );
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      events: null
    };
    this.getEvents();
  }

  async getEvents() {
    var requestOptions = {
      method: "GET"
    };

    fetch(
      "https://debug.smartcampus-bphc.in/api/notifier/events/",
      requestOptions
    )
      .then(response => response.text())
      .then(result =>
        this.setState({ events: JSON.parse(result), loaded: true })
      )
      .catch(error => console.log("error", error));
  }

  handleOnPress = async () => {
    this.props.dispatch(addTodo(new Date().getUTCSeconds()));
  };

  handleClear = async () => {
    this.props.dispatch({
      type: "CLEAR_TODOS"
    });
  };

  componentDidMount() {
    //Here is the Trick
    const { navigation } = this.props;
    //Adding an event listner om focus
    //So whenever the screen will have focus it will set the state to zero
    this.focusListener = navigation.addListener("didFocus", () => {
      this.setState({ loaded: false, events: null });
      this.getEvents();
    });
  }

  render() {
    if (!this.state.loaded) {
      return (
        <View style={globalStyles.container}>
          <Text style={{ flex: 1, textAlign: "center" }}>
            Fetching latest events
          </Text>
        </View>
      );
    }
    let list = [];
    console.log(this.state.events);
    for (let event of this.state.events) {
      list.push(
        <Text key={event.fields.created_at}>Event : {event.fields.name}</Text>
      );
    }
    return (
      <View style={globalStyles.margin}>
        <Text style={globalStyles.heading}>Current Events</Text>
        {/* <View style={globalStyles.margin}>
          <Button
            onPress={this.handleOnPress}
            color={Colors.themePrimary}
            title="Add todo"
          ></Button>
        </View>
        <View style={globalStyles.margin}>
          <Button onPress={this.handleClear} title="Delete all todos"></Button>
        </View> */}
        <FlatList
          data={this.state.events}
          renderItem={({ item }) => (
            <TouchableNativeFeedback
              onPress={() => {
                this.props.navigation.navigate("Event", {
                  event: item
                });
              }}
            >
              <View style={globalStyles.event}>
                <Text>{item.fields.name}</Text>
              </View>
            </TouchableNativeFeedback>
          )}
          keyExtractor={item => item.fields.created_at}
        ></FlatList>
        <View style={globalStyles.margin}>
          <Button
            onPress={() => {
              this.props.navigation.navigate("NewEvent");
            }}
            title="Create new event"
            color={Colors.themePrimary}
          ></Button>
        </View>
        <View style={globalStyles.margin}>
          <Button
            onPress={() => {
              this.getEvents();
            }}
            title="Refresh"
            color="grey"
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
