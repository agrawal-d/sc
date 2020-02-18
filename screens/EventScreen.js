import * as React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import globalStyles from "../styles/styles";
import "../actions/actions";
import { ScrollView } from "react-native-gesture-handler";

class EventScreen extends React.Component {
  constructor(props) {
    super(props);
    this.event = this.props.route.params.event;
    this.props.navigation.setOptions({ headerTitle: this.event.fields.name });
  }
  render() {
    console.log(this.props);
    const fields = this.props.route.params.event.fields;
    return (
      <View style={globalStyles.margin}>
        <ScrollView>
          <Text style={globalStyles.themeTitle}>Event Name</Text>
          <Text>{fields.name}</Text>
          <Text style={globalStyles.themeTitle}>Descreption</Text>
          <Text>{fields.description}</Text>
          <Text style={globalStyles.themeTitle}>Cost</Text>
          <Text>INR {fields.cost}</Text>
          <Text style={globalStyles.themeTitle}>Organizer</Text>
          <Text>{fields.organizer}</Text>
          <Text style={globalStyles.themeTitle}>Location</Text>
          <Text>{fields.location}</Text>
          <Text style={globalStyles.themeTitle}>Starts at</Text>
          <Text>{fields.start_timestamp}</Text>
          <Text style={globalStyles.themeTitle}>Ends at</Text>
          <Text>{fields.end_timestamp}</Text>
          <Text style={globalStyles.themeTitle}>Rating</Text>
          <Text>{fields.event_rating}</Text>
          <Text style={globalStyles.themeTitle}>Active</Text>
          <Text>{fields.is_active ? "Yes" : "No"}</Text>
          <Text style={globalStyles.themeTitle}>Total Seats</Text>
          <Text>{fields["Total Seats"]}</Text>
          {/* doesn't display */}
          <Text style={globalStyles.themeTitle}>Filled Seats</Text>
          <Text>{fields["Filled Seats"]}</Text>
          {/* doesn't display */}
        </ScrollView>
      </View>
    );
  }
}

export default connect()(EventScreen);
