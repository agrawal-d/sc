import * as React from "react";
import { View, Text, Button, ToastAndroid } from "react-native";
import { connect } from "react-redux";
import globalStyles from "../styles/styles";
import "../actions/actions";
import { TextInput } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from "../constants/Colors";
class NewEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      start_timestamp: "Saturday, 15 February 2020 17:00:00 GMT+05:30",
      end_timestamp: "Saturday, 15 February 2020 20:00:00 GMT+05:30",
      reminder_timestamp: "Saturday, 15 February 2020 16:00:00 GMT+05:30",
      cost: "1350.00",
      total_seats: 200,
      location: "F102",
      registration_deadline: "Saturday, 10 February 2020 00:00:00 GMT+05:30",
      reminder_description: "Friend remined for Event name",
      organizer_name: "Organizer name",
      organizer_phone: "92929292929292",
      showPicker: false
    };
    this.props.navigation.setOptions({ headerTitle: "Create New Event" });
  }

  async handleSubmit() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      ...this.state
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw
    };

    await fetch(
      "https://debug.smartcampus-bphc.in/api/notifier/events/",
      requestOptions
    )
      .then(response => response.text())
      .then(result => {
        console.log(result);
        ToastAndroid.show("Event Created", ToastAndroid.SHORT);
        this.props.navigation.navigate("EventsHome");
      })
      .catch(error => {
        console.log("error", error);
        ToastAndroid.show(JSON.stringify(error), ToastAndroid.SHORT);
      });
  }

  render() {
    /**
     * @todo Some fields are missing, and default values are used. Update it later.
     */
    return (
      <View style={{ ...globalStyles.margin, flex: 1 }}>
        <TextInput
          style={globalStyles.eventInput}
          placeholder="Event Name"
          value={this.state.name}
          onChangeText={text => this.setState({ name: text })}
        />
        <TextInput
          style={globalStyles.eventInput}
          placeholder="Descreption"
          value={this.state.description}
          onChangeText={text => this.setState({ description: text })}
        />
        <TextInput
          style={globalStyles.eventInput}
          placeholder="Total Seats"
          value={this.state.total_seats.toString()}
          onChangeText={text => this.setState({ total_seats: text })}
        />
        <View style={globalStyles.margin}>
          <Text>Start time is current time.</Text>
        </View>
        <View style={globalStyles.margin}>
          <Button
            title="Change end time"
            onPress={() => {
              this.setState({ showPicker: true });
            }}
            color={Colors.themePrimary}
          ></Button>
        </View>
        {this.state.showPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={new Date()}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={e => {
              console.log(e);
              this.setState({
                end_timestamp: e.nativeEvent.timeStamp,
                showPicker: false
              });
            }}
          />
        )}
        <View
          style={{ position: "absolute", bottom: 0, left: 0, width: "100%" }}
        >
          <Button
            title="Create Event"
            onPress={() => {
              this.handleSubmit();
            }}
            color={Colors.themePrimary}
          ></Button>
        </View>
      </View>
    );
  }
}

export default connect()(NewEvent);
